import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cookieParser());

app.use(cors());

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`)
})