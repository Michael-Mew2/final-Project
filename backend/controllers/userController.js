import { AUTH_CONFIG } from "../config/auth.config.js";
import { generateToken, verifyToken } from "../middleware/jwt.js";
import User from "../models/User.js";
import crypto from "crypto";
import bcrypt from "bcrypt";
import sendEmail from "../utils/emailService.js";

// ==========

// Nutzer registrieren:
export async function createUser(req, res) {
  try {
    // console.log("request Body:", req.body);
    const { username, email } = req.body;
    // console.log({ username, email });

    const [existingEmail, existingUsername] = await Promise.all([
      User.findOne({ email }),
      User.findOne({ username }),
    ]);

    if (existingEmail) {
      console.log("User already exists");
      return res.status(400).json({ msg: "User already exists" });
    }

    if (existingUsername) {
      console.log("Username already taken!");
      return res.status(226).json({ msg: "Username already taken" });
    }

    const validationToken = crypto.randomBytes(32).toString("hex");

    const user = await User.create({
      ...req.body,
      validationToken,
      loginAttempts: 0,
    });
    console.log("newUser:", user);

    const validationUrl = `${process.env.FRONTEND_URL}/validate-email/${validationToken}`;
    await sendEmail({
      to: `${email}`,
      subject: `Hi ${username}, welcome to the Pixel-Together Community!`,
      text: `Thank you for signing up and joining our community! Please click on the following link to verify your account, so that you can start on putting your first Pixel. ${validationUrl} . Greetings Michael, Mirko & Timo from Pixel-Together. P.S: PLEASE NOT THAT IF THIS WASN'T YOU WHO REGISTERED TO OUR COMMUNITY DO NOT VERIFY THIS ACCOUNT BY CLICKING ON THE LINK AND INSTEAD DELETE THIS EMAIL ENTIRELY!`,
      html: `<h4>Hello ${username}</h4><p>Thank you for signing up and joining our community! Please click <a href="${validationUrl}">here</a> to verify your account, so that you can start on putting your first Pixel. <p>Greetings</p><h5>Michael, Mirko & Timo from Pixel-Together</h5><p>P.S: PLEASE NOT THAT IF THIS WASN'T YOU WHO REGISTERED TO OUR COMMUNITY DO NOT VERIFY THIS ACCOUNT BY CLICKING ON THE LINK AND INSTEAD DELETE THIS EMAIL ENTIRELY!</p>`,
    });

    res.status(201).json({
      msg: "User was successfully created. Please check your email for validation.",
    });
  } catch (error) {
    console.log("error in createUser:", error);
    res.status(500).json({ msg: "Creating User was unsuccessful!" });
  }
}

// ----------
// E-Mail validieren
export async function validateEmail(req, res) {
  try {
    const { token } = req.params;
    const user = await User.findOne({ validationToken: token });
    if (!user) {
      return res.status(400).json({ msg: "Invalid validation Email" });
    }

    user.emailValidated = true;
    user.validationToken = undefined;
    await user.save();

    res.status(200).json({ msg: "Email successfully verified!" });
  } catch (error) {
    console.log("Email validation error:", error);
    res.status(500).json({ msg: "Error validating email." });
  }
}

// ----------
// Nutzer einloggen:
export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select(
      `+password +loginAttempts`
    );
    if (!user) return res.status(404).json({ msg: "User not found!" });

    if (user.loginAttempts >= AUTH_CONFIG.MAX_LOGIN_ATTEMPTS) {
      const timeLeft =
        user.lastLoginAttempt.getTime() +
        AUTH_CONFIG.LOGIN_TIMEOUT -
        Date.now();
      if (timeLeft > 0) {
        return res.status(429).json({
          msg: `Account temporarily locked. Try again in ${Math.ceil(
            timeLeft / 60000
          )} minutes.`,
        });
      }
      // Reset nach Timeout
      user.loginAttempts = 0;
    }

    const passwordMatch = await user.authenticate(password);
    // console.log(passwordMatch);
    if (!passwordMatch) {
      user.loginAttempts = (user.loginAttempts || 0) + 1;
      user.lastLoginAttempt = new Date();
      await user.save();
      return res.status(401).json({ msg: "Login doesn't match!" });
    }

    if (!user.isAllowedIn)
      return res.status(401).json({
        msg: "Your accunt has been blocked, please contact the page administrators!",
      });

    if (!user.emailValidated) {
      return res
        .status(403)
        .json({ msg: "Please verify your email-address first!" });
    }

    user.loginAttempts = 0;
    user.lastLoginTime = new Date();
    await user.save();

    const token = generateToken({ userId: user._id, role: user.role });

    return res
      .status(200)
      .cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "Production",
        sameSite: "strict",
        maxAge: AUTH_CONFIG.COOKIE_MAX_AGE,
      })
      .json({ msg: "Login successful", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error", error });
  }
}

// ----------
// Passwort zurücksetzten anfordern:
export async function requestPasswordReset(req, res) {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found!" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + AUTH_CONFIG.PASSWORD_RESET_EXPIRY;
    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL}/reset/${resetToken}`;
    await sendEmail({
      to: email,
      subject: "Password Reset",
      text: `To reset your password click: ${resetUrl}`,
      html: `<h3>You forgot your password or are trying to hack in a friends account?</h3> <p>No problemo, just click <a href="${resetUrl}">here</a> to reset your password and get access to your account again.</p><p>IF IT WASN'T YOU THAT MADE THIS REQUEST, INFORM OUR MODERATING TEAM VIA OUR WEBSITE!</p>`,
    });

    res.status(200).json({
      msg: "You've got mail! Everything you need to restore your password is in there.",
    });
  } catch (error) {
    console.log("Password reset error:", error);
    res.status(500).json({ msg: "Error processing password reset request" });
  }
}

// ----------
// Password zurücksetzen:

export async function resetPassword(req, res) {
  try {
    const { token, newPassword } = req.body;

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ msg: "Invalid or expired reset token" });
    }

    user.password = await bcrypt.hash(newPassword, 12);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ msg: "Password successfully reset" });
  } catch (error) {
    console.error("Password reset error:", error);
    res.status(500).json({ msg: "Error resetting password" });
  }
}

// ----------
// Autentifizierungsstatus überprüfen:
export async function checkAuthStatus(req, res) {
  try {
    const token = req.cookies.jwt || req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ msg: "No token provided!" });

    const decoded = verifyToken(token);
    if (!decoded) return res.status(401).json({ msg: "Invalid token!" });

    const user = await User.findById(decoded.userId);
    if (!user) return res.status(404).json({ msg: "User not found!" });

    return res.status(200).json({ msg: "Authenticated and allowed to enter!" });
  } catch (error) {
    console.error("Auth check error:", error);
    res.status(500).json({ msg: "Error checking authentication!" });
  }
}

// ----------
// Nutzer ausloggen:
export function logoutUser(req, res) {
  try {
    res
      .clearCookie("jwt", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      })
      .status(200)
      .json({ msg: "Logout complete!" });
  } catch (error) {
    console.log("Logout error:", error);
    res.status(500).json({ msg: "Server error", error });
  }
}

// ----------
// Daten eines bestimmten Nutzers aufrufen:
export async function getUserData(req, res) {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: "User not found!" });

    res.status(200).json({ userData: user });
  } catch (error) {
    res.status(500).json({ msg: "Error fetching user at getUserData", error });
  }
}

// ----------
//Daten eines bestimmten Nutzers aktualisieren:
export async function updateUserData(req, res) {
  try {
    const roleBasedFields = {
      user: ["username", "email"],
      admin: ["username", "email", "role", "isAllowedIn", "isPremiumMember"],
    };

    const userRole = req.user.role;
    // console.log("user-role", userRole);

    const allowedFields = roleBasedFields[userRole] || [];
    // console.log("allowed Fields", allowedFields);

    const updates = Object.keys(req.body);
    // console.log(updates);

    const isValidUpdates = updates.every((field) =>
      allowedFields.includes(field)
    );
    // console.log(isValidUpdates);

    if (!isValidUpdates)
      return res.status(400).json({ msg: "Invalid updates!" });

    const { userId } = req.params;
    // console.log(userId);

    let query = {};
    if (userRole !== "admin") {
      query._id = userId;
    }

    // console.log(query);

    const updatedUser = await User.findByIdAndUpdate(query, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedUser) return res.status(404).json({ msg: "User not found!" });

    res
      .status(200)
      .json({ msg: "User was successfully updated!", userData: updatedUser });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error fetching user at updateUserData", error });
  }
}

// ----------
// alle Nutzer (mit erweitereten Informationen) anzeigen:
export async function getAllUserAsAdmin(req, res) {
  try {
    const users = await User.find(
      {},
      "username email birthdate role isAllowedIn isPremiumMember lastLoginTime totalPixelsPlaced placedPixel"
    );

    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error });
  }
}

// alle Nutzer (mit Standart-Informationen) anzeigen:
export async function getAllUser(req, res) {
  try {
    const users = await User.find({}, "username totalPixelsPlaced");

    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error });
  }
}

// ----------
// Nutzer sperren:
export async function blockUser(req, res) {
  try {
    // const adminRole = req.user.role;

    const userId = req.params.userId;
    // console.log(userId);

    const userToBlock = await User.findById(userId);
    // console.log({userToBlock});

    if (!userToBlock) return res.status(404).json({ msg: "user not found!" });

    if (userToBlock.role.toString() === "admin")
      return res.status(405).json({
        msg: "You are not allowed to block another admin, please contact other admins first!",
      });

    const blockedUser = await User.findByIdAndUpdate(
      userId,
      { isAllowedIn: false },
      { new: true, runValidators: true }
    );

    return res
      .status(200)
      .json({ msg: "User was blocked", userData: blockedUser });
  } catch (error) {
    return res.status(500).json({ msg: "Server error", error });
  }
}

// Nutzer entsperren:
export async function unblockUser(req, res) {
  try {
    // const adminRole = req.user.role;

    const userId = req.params.userId;
    // console.log(userId);

    const userToUnBlock = await User.findById(userId);
    // console.log({userToBlock});

    if (!userToUnBlock) return res.status(404).json({ msg: "user not found!" });

    if (userToUnBlock.role.toString() === "admin")
      return res.status(405).json({
        msg: "You are not allowed to block another admin, please contact other admins first!",
      });

    const unBlockedUser = await User.findByIdAndUpdate(
      userId,
      { isAllowedIn: true },
      { new: true, runValidators: true }
    );

    return res
      .status(200)
      .json({ msg: "User was blocked", userData: unBlockedUser });
  } catch (error) {
    return res.status(500).json({ msg: "Server error", error });
  }
}

// ----------
// Nutzer löschen:
export async function deleteUserAsAdmin(req, res) {
  try {
    const userId = req.params.userId;

    console.log(userId);

    const userToDelete = await User.findById(userId);
    console.log(userToDelete);

    if (!userToDelete) return res.status(404).json({ msg: "user not found!" });

    if (userToDelete.role.toString() === "admin")
      return res.status(405).json({
        msg: "You are not allowed to delete another admin, please contact other admins first!",
      });

    const deletedUser = await User.findByIdAndDelete(userId);

    return res
      .status(200)
      .json({ msg: "User was deleted", userData: deletedUser });
  } catch (error) {
    return res.status(500).json({ msg: "Server error", error });
  }
}
