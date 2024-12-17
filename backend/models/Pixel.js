import { Schema, model } from "mongoose";

const pixelSchema = new Schema(
  {
    x: {
      type: Number,
    },
    y: {
      type: Number,
    },
    color: {
      type: String,
    },
    addedBy: {
      type: String,
    },
  },
  { timestamps: true, _id: false }
);

const Pixel = model("Pixel", pixelSchema);
export default Pixel;