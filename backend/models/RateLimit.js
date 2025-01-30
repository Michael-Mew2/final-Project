import { Schema, SchemaTypes, model } from "mongoose";

const rateLimitSchema = new Schema (
    {
        userId: {
            type: SchemaTypes.ObjectId,
            required: true,
            unique: true
        },
        requestCount: {
            type: Number, 
            required: true,
            default: 0
        },
        windowStart: {
            type: Date,
            required: true,
        }
    }
);

const RateLimit = model("RateLimit", rateLimitSchema);

export default RateLimit;