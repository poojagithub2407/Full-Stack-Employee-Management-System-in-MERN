import { Router } from "express";
import { protect, protectAdmin } from "../middleware/auth.middleware.js";
import { createPayslip, getByIdPayslip, getPayslips } from './../controllers/Payslip.controller.js';

const payslipRouter = Router();
payslipRouter.post('/',protect, createPayslip)
payslipRouter.get('/', protect, getPayslips);
payslipRouter.get('/:id', protect, getByIdPayslip)
export default payslipRouter
