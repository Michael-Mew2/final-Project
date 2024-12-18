import express from "express";
import connectDB from "./config/dbconnect.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/userRouter.js";
import session from "express-session";
import pixelRouter from "./routes/pixelRouter.js";

connectDB();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cookieParser());

app.use(cors());

app.use(express.json());

app.use(session({
  secret: process.env.SESSION_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: {secure: false},
}))

app.use("/user", userRouter)
app.use("/canvas", pixelRouter)

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`)
});