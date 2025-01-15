import Pixel from "../models/Pixel";

export const handlePlacePixel = async (io, socket, data) => {
    const {x, y, color, userId} = data;

    try {
        const pixel = await Pixel.findOneAndUpdate
    } catch (error) {
        
    }
}