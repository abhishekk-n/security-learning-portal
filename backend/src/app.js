
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import resourceRoutes from "./routes/resourceRoutes.js";
import {
  notFoundHandler,
  errorHandler,
} from "./middleware/errorHandler.js";

const app = express();

// Security headers
app.use(helmet());

// Allow React frontend
// Allow approved frontend origins
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:4173",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
  })
);

// Parse JSON requests
app.use(express.json({ limit: "10kb" }));

// API rate limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});

app.use("/api", apiLimiter);

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Security Learning Portal API is running",
  });
});

// Resource routes
app.use("/api/resources", resourceRoutes);

app.get("/", (req, res) => {
  res.send("Security Learning Portal Backend is Running!");
});

app.use(notFoundHandler);
app.use(errorHandler);
export default app;
