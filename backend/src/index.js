import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Load environment variables
import dotenv from "dotenv";
dotenv.config();

// Middleware
app.use(bodyParser.json());
app.use(cookieParser()); // Add cookie parser middleware

// Serve static files from the public directory (built frontend)
app.use(express.static(path.join(__dirname, "../public")));

app.use((req, res, next) => {
  // set headers to each response
  // Set specific origin instead of wildcard when using credentials
  const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
  res.setHeader("Access-Control-Allow-Origin", frontendUrl); // frontend URL
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true"); // Required for credentials

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

// API routes
app.use("/api/auth", authRoutes);

// Serve the frontend for all non-API routes (SPA routing)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

const PORT = process.env.PORT || 3001;
const NODE_ENV = process.env.NODE_ENV || "development";

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} in ${NODE_ENV} mode`);
  console.log(
    `Frontend URL: ${process.env.FRONTEND_URL || "http://localhost:3000"}`
  );
});
