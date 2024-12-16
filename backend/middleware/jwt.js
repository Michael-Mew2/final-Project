import jwt from "jsonwebtoken";
import User from "../models/User.js";

const secret = process.env.JWT_SECRET;

export const generateToken = (payload) => {
  if (typeof payload !== "object") {
    throw new Error("Payload must be an object when using 'expiresIn'!");
  }

  const expiresIn = process.env.JWT_EXPIRES_IN || "1h";
  if (!/^\d+[smhd]?$/.test(expiresIn) && isNaN(Number(expiresIn))) {
    throw new Error("Invalid JWT_EXPIRES_IN value in environment variables.");
  }

  return jwt.sign(payload, secret, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1h",
  });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    console.error("Error verifying token:", error.message);
    throw error;
  }
};

export const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token)
      return res.status(401).json({ msg: "Not authorized to enter here!" });

    const decoded = verifyToken(token);
    if (!decoded) res.status(401).json({ msg: "Invalid token!" });

    const user = await User.findById(decoded.userId);
    if (!user) return res.status(404).json({ msg: "User not found!" });

    req.user = { id: user._id, role: user.role };

    next();
  } catch (error) {
    console.error("Authentification error:", error);
    return res.status(403).json({ msg: "Authentification failed!" });
  }
};
