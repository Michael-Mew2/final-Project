import { generateToken, verifyToken } from "../middleware/jwt.js";
import User from "../models/User.js";

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

    const passwordMatch = user.authenticate(password);

    if (!passwordMatch)
      return res.status(401).json({ msg: "Login doesn't match!" });

    const token = generateToken({ userId: user._id });

    return res
      .status(200)
      .cookie("jwt", token, { maxAge: 60 * 60 * 1000 })
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
    if (!req.session)
      res.status(400).json({ msg: "No active sesion to destroy!" });
    req.session.destroy((err) => {
      if (err) return res.status(500).json({ msg: "Logout failed!" });

      res.status(200).clearCookie("jwt").json({ msg: "Logout complete!" });
    });
  } catch (error) {
    console.log(error);
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
      user: ["username", "email", "password"],
      admin: ["username", "email", "role", "isAllowedIn", "isPremiumMember"],
    };

    const userRole = req.user.role;
    // console.log("user-role", userRole);

    const allowedFields = roleBasedFields[userRole] || [];
    // console.log("allowed Fields", allowedFields);

    const updates = Object.keys(req.body);

    const isValidUpdates = updates.every((field) =>
      allowedFields.includes(field)
    );
    if (!isValidUpdates)
      return res.status(400).json({ msg: "Invalid updates!" });

    const { userId } = req.params;

    let query = {}
    if(userRole !== "admin") {
      query._id = userId;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
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
