import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import chartRoute from "./routes/chartRoute.js";
import cors from "cors";

const app = express();
dotenv.config();
app.use(cors());
const PORT = 3001;

await mongoose
  .connect(process.env.DB_STRING)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(() => {
    console.log("Failed to connect");
  });

app.use("/", chartRoute);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
