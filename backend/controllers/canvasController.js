import Pixel from "../models/Pixel.js";
import User from "../models/User.js";

export async function putPixelOnCanvas(req, res) {
    const user = req.user;
    const {x, y, color} = req.body;
    console.log(user);
    return res.status(200).json({msg: user, x, y, color})
    
}