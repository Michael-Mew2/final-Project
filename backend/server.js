import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import session from "express-session";
import connectDB from "./config/dbconnect.js";
import userRouter from "./routes/userRouter.js";
import pixelRouter from "./routes/pixelRouter.js";
import canvasRouter from "./routes/canvasRouter.js";
import "./utils/rateLimitCleanup.js"

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
app.use("/pixel", pixelRouter)
app.use("/canvas", canvasRouter)

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`)
});