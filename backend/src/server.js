import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middlerware/rateLimiter.js";
import cors from "cors";

const app = express();
dotenv.config();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
// app.use(rateLimiter);
const port = process.env.PORT;
connectDB();
app.use("/api/notes", notesRoutes);

connectDB().then(() => {
  app.listen(port, () => {
    console.log("Server started on Port:", port);
  });
});
