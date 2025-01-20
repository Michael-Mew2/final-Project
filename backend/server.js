import http from "http";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import session from "express-session";
import connectDB from "./config/dbconnect.js";
import userRouter from "./routes/userRouter.js";
import pixelRouter from "./routes/pixelRouter.js";
import canvasRouter from "./routes/canvasRouter.js";
import "./utils/rateLimitCleanup.js"
import { configureSocket } from "./config/socket.js";

const PORT = process.env.PORT || 3000;
const FRONT_END = process.env.NODE_ENV === 'development' ? 'http://localhost:5173' : process.env.FRONTEND_URL;
const app = express();
const server = http.createServer(app);
const io = configureSocket(server);


connectDB().catch(error => {
  console.error("Error on connection the database:", error);
  process.exit(1);
});

app.use(cookieParser());

app.use(cors({
  origin: FRONT_END, // Frontend-URL
  credentials: true, // Allows sending Cookies
}));

app.use(express.json());

app.use(session({
  secret: process.env.SESSION_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: {secure: false},
}))

app.use("/users", userRouter)
app.use("/pixel", pixelRouter)
app.use("/canvas", canvasRouter)

server.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`)
});