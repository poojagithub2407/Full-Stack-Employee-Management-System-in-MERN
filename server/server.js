import express from "express";
import cors from "cors";
import "dotenv/config";
import multer from "multer";

import connectDB from "./config/db.js";

import authRouter from "./routes/auth.route.js";
import employeesRouter from "./routes/Employee.route.js";
import profileRouter from "./routes/profile.route.js";
import attendanceRouter from "./routes/attendance.route.js";
import leaveRouter from "./routes/leave.route.js";
import payslipRouter from "./routes/payslip.router.js";
import dashboardRouter from "./routes/dashboard.route.js";

import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(multer().none());

// Connect Database
connectDB().catch((err) => {
  console.error("Database connection failed:", err);
});

// Health Check
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Routes
app.use("/api/auth", authRouter);
app.use("/api/employees", employeesRouter);
app.use("/api/profile", profileRouter);
app.use("/api/attendance", attendanceRouter);
app.use("/api/leave", leaveRouter);
app.use("/api/payslips", payslipRouter);
app.use("/api/dashboard", dashboardRouter);

// Inngest
app.use(
  "/api/inngest",
  serve({
    client: inngest,
    functions,
  })
);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err);

  res.status(500).json({
    error: err.message || "Internal Server Error",
  });
});

// Export app for Vercel
export default app;