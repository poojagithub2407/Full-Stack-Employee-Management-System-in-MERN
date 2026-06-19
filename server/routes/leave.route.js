import { Router } from "express";
import { protect } from "../middleware/auth.middleware.js";
import { createLeave, getLeaves, updateLeave } from "../controllers/Leave.controller.js";
const leaveRouter = Router();
leaveRouter.post('/', protect, createLeave);
leaveRouter.get('/', protect, getLeaves);
leaveRouter.patch('/:id', protect, updateLeave);

export default leaveRouter