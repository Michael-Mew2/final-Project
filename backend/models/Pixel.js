import { Schema, model } from "mongoose";

const pixelSchema = new Schema(
  {
    x: {
      type: Number,
      required: true,
    },
    y: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    addedBy: {
      type: String,
    },
    history: [
      {
        color: { type: String, required: true },
        addedBy: { type: String },
        placedAt: { type: Date, default: Date.now },
      },
    ],
  }, {timestamps: true}
);

pixelSchema.index({x: 1, y: 1}, {unique: true})

const Pixel = model("Pixel", pixelSchema);
export default Pixel;