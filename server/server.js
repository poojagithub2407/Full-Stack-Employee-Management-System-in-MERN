import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import multer from 'multer';
import connectDB from './config/db.js';
import authRouter from './routes/auth.route.js';
import employeesRouter from './routes/Employee.route.js';
import profileRouter from './routes/profile.route.js';
import attendanceRouter from './routes/attendance.route.js';
import leaveRouter from './routes/leave.route.js';
import payslipRouter from './routes/payslip.router.js';
import dashboardRouter from './routes/dashboard.route.js';
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js"


const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(multer().none());

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.use('/api/auth', authRouter)
app.use('/api/employees', employeesRouter)
app.use('/api/profile', profileRouter)
app.use('/api/attendance', attendanceRouter)
app.use('/api/leave', leaveRouter)
app.use('/api/payslips', payslipRouter)
app.use('/api/dashboard', dashboardRouter)

app.use("/api/inngest", serve({ client: inngest, functions }));





await connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});