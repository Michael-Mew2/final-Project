import express from "express";
import connectDB from "./config/dbconnect.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/userRouter.js";

connectDB();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cookieParser());

app.use(cors());

app.use(express.json());

app.use("/user", userRouter)

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`)
});