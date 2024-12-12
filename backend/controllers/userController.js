import User from "../models/User.js";

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

    const newUser = await User.create(req.body);
    // console.log("newUser:", newUser);

    res.status(201).json({ msg: "User was successfully created" });
  } catch (error) {
    console.log("error in createUser:", error);
    res.status(500).json({ msg: "Creating User was unsuccessful!" });
  }
}
