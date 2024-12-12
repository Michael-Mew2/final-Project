import {Schema, model} from "mongoose";

const userSchema = new Schema ({
    // Vom user angegebene Konto informationen
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    birthdate: String,
    // Rolle des Users:
    role: {
        type: [String],
        enum: ["user", "admin"],
        default: ["user"],
    },
    // Premium-abo einstellungen:
    isPremiumMember: {
        type: Boolean,
        default: false
    },
    // E-mail Validierung:
    emailValidated: {
        type: Boolean,
        default: false,
    },
    validationToken: String,
    // letzter log des Users:
    lastLoginTime: {
        type: Date,
        default: null
    },
    // Pixel Infos:
    totalPixelsPlaced: {
        type: Number,
        default: 0
    },
    lastPlacedPixel: {
        type: {
            x: {type: Number, required: true},
            y: {type: Number, required: true},
            color: {type: String, required: true}
        },
        default: null,
    },
    placedPixel: {
        type: [
            {
                x: {type: Number, required: true},
                y: {type: Number, required: true},
                color: {type: String, required: true},
                placedAt: {type: Date, default: Date.now}
            }
        ],
        default: []
    }
}, {timestamps: true});

const User = model("User", userSchema)

export default User;