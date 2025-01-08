import { generateToken, verifyToken } from "../middleware/jwt.js";
import User from "../models/User.js";

// ==========

const COOKIE_MAX_AGE =
  parseInt(process.env.COOKIE_EXPIRES_IN) || 60 * 60 * 1000;

// ==========

// Nutzer registrieren:
export async function createUser(req, res) {
  try {
    // console.log("request Body:", req.body);
    const { username, email } = req.body;
    // console.log({ username, email });

    const existingEmail = await User.findOne({ email });

    const existingUsername = await User.findOne({ username });

    if (existingEmail) {
      console.log("User already exists");
      return res.status(400).json({ msg: "User already exists" });
    }

    if (existingUsername) {
      console.log("Username already taken!");
      return res.status(226).json({ msg: "Username already taken" });
    }

    await User.create(req.body);
    // console.log("newUser:", newUser);

    res.status(201).json({ msg: "User was successfully created" });
  } catch (error) {
    console.log("error in createUser:", error);
    res.status(500).json({ msg: "Creating User was unsuccessful!" });
  }
}

// ----------
// Nutzer einloggen:
export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found!" });

    const passwordMatch = await user.authenticate(password);
    // console.log(passwordMatch);
    if (!passwordMatch)
      return res.status(401).json({ msg: "Login doesn't match!" });

    if (!user.isAllowedIn)
      return res.status(401).json({
        msg: "Your accunt has been blocked, please contact the page administrators!",
      });

    const token = generateToken({ userId: user._id });

    return res
      .status(200)
      .cookie("jwt", token, { httpOnly: true, maxAge: COOKIE_MAX_AGE })
      .json({ msg: "Login successful", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error", error });
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
    res.clearCookie("jwt").status(200).json({ msg: "Logout complete!" });
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
