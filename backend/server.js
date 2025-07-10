import express from "express";
import ctcRoutes from "./routes/ctc.route.js";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

dotenv.config();

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", ctcRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend", "dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`server is started at http://localhost:${PORT}`);
});
