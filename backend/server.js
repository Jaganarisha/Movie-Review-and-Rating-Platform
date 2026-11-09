
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import routes from "./routes/index.js";

dotenv.config();

const app = express();

// Fix Render proxy configuration
app.set("trust proxy", 1);

app.use(helmet());

app.use(
  cors({
    origin: (
      process.env.CLIENT_URL || "http://localhost:5173"
    ).split(","),
  })
);

app.use(express.json({ limit: "1mb" }));

app.use(
  "/api",
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 300,
  })
);

app.use("/api", routes);

app.use((req, res) =>
  res.status(404).json({ message: "Route not found" })
);

app.use((err, req, res, next) => {
  if (err.name === "ValidationError") err.status = 400;

  if (err.code === 11000) {
    err.status = 409;
    err.message = "Already exists";
  }

  res.status(err.status || 500).json({
    message: err.message || "Server error",
  });
});

connectDB().then(() =>
  app.listen(process.env.PORT || 5000, () =>
    console.log("API running on", process.env.PORT || 5000)
  )
);
