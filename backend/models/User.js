import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

function escapeHTML(str) {
  return str.replace(/[&<>"']/g, function (char) {
    const blackList = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return blackList[char];
  });
}

const userSchema = new Schema(
  {
    // Vom user angegebene Konto informationen
    username: {
      type: String,
      required: [true, "Please enter a username!"],
      unique: true,
      set: (v) =>
        escapeHTML(
          v
        ) /* callback, die die funktion escapeHTML mit dem string ausführt */,
    },
    email: {
      type: String,
      required: [true, "Please enter a valid Email-address!"],
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(v);
        },
        message: "Email-address is not valid, please try again!",
      },
    },
    password: {
      type: String,
      required: [true, "Please enter a password!"],
      minLength: [8, "Your password requires at least 8 characters!"],
      // maxLength: [50, "Your password is too long, our limit is 50 characters!"],
      match: [
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g,
        "Your password needs at least one numerical digit, a special symbol and an upper- and lowercase letter!",
      ],
    },
    birthdate: String,
    // Rolle des Users:
    role: {
      type: [String],
      enum: ["user", "admin", "premium"],
      default: ["user"],
    },
    isAllowedIn: {
      type: Boolean,
      default: true,
    },
    // Premium-abo einstellungen:
    isPremiumMember: {
      type: Boolean,
      default: false,
    },
    // Sicherheitsfelder für die Anmeldung:
    loginAttempts: {
      type: Number,
      default: 0
    },
    lastLoginAttempt: {
      type: Date
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    // E-mail Validierung:
    emailValidated: {
      type: Boolean,
      default: false,
    },
    validationToken: String,
    // letzter log des Users:
    lastLoginTime: {
      type: Date,
      default: null,
    },
    // Pixel Infos:
    totalPixelsPlaced: {
      type: Number,
      default: 0,
    },
    lastPlacedPixel: {
      type: {
        x: { type: Number, required: true },
        y: { type: Number, required: true },
        color: { type: String, required: true },
      },
      default: null,
    },
    placedPixel: {
      type: [
        {
          x: { type: Number, required: true },
          y: { type: Number, required: true },
          color: { type: String, required: true },
          placedAt: { type: Date, default: Date.now },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password")) {
      const hash = await bcrypt.hash(this.password, 12);
      this.password = hash;
    }
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.authenticate = async function (password) {
  // const hash = await bcrypt.hash(password, 12);
  // // console.log(hash);
  console.log("hashed db-password:",this.password);
  console.log("cleartext password:", password);
  
  
  return await bcrypt.compare(password, this.password);
  // if(this.password === password) return true
};

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

const User = model("User", userSchema);
export default User;
