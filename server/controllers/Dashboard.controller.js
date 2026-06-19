// Get dashboard for employee and admin

import Attendance from "../models/Attendance.model.js";
import Employee from "../models/Employee.model.js";
import LeaveApplication from "../models/Leave.model.js";
import Payslip from "../models/Payslip.model.js";
import { DEPARTMENTS } from "../constant/department.js";
export const getDashboard = async (req, res) => {
     try {
          const session = req.session;

          if (session.role === 'ADMIN') {
               const startOfDay = new Date();
               startOfDay.setHours(0, 0, 0, 0);

               const endOfDay = new Date();
               endOfDay.setHours(23, 59, 59, 999);

               const [totalEmployee, totalAttendance, pendingLeaves] = await Promise.all([
                    Employee.countDocuments({
                         isDeleted: { $ne: true }
                    }),

                    Attendance.countDocuments({
                         date: {
                              $gte: startOfDay,
                              $lte: endOfDay
                         }
                    }),

                    LeaveApplication.countDocuments({
                         status: 'PENDING'
                    })
               ]);

               return res.json({
                    role: 'ADMIN',
                    totalEmployee,
                    totalDepartments: DEPARTMENTS.length, // Make sure DEPARTMENTS is imported
                    totalAttendance,
                    pendingLeaves
               });
          } else {
               const employee = await Employee.findOne({
                    userId: session.userId
               }).lean();

               if (!employee) {
                    return res.status(404).json({
                         error: 'Employee not found'
                    });
               }

               const today = new Date();

               const [currentMonthAttendance, pendingLeaves, lastestPayslip] =
                    await Promise.all([
                         Attendance.countDocuments({
                              employeeId: employee._id,
                              date: {
                                   $gte: new Date(
                                        today.getFullYear(),
                                        today.getMonth(),
                                        1
                                   ),
                                   $lt: new Date(
                                        today.getFullYear(),
                                        today.getMonth() + 1,
                                        1
                                   )
                              }
                         }),

                         LeaveApplication.countDocuments({
                              employee: employee._id,
                              status: 'PENDING'
                         }),

                         Payslip.findOne({
                              employeeId: employee._id
                         })
                              .sort({
                                   createdAt: -1
                              })
                              .lean()
                    ]);

               return res.json({
                    role: 'EMPLOYEE',
                    employee: {
                         ...employee,
                         id: employee._id.toString(),
                         currentMonthAttendance,
                         pendingLeaves,
                         lastestPayslip: lastestPayslip
                              ? {
                                   ...lastestPayslip,
                                   id: lastestPayslip._id.toString()
                              }
                              : null
                    }
               });
          }
     } catch (error) {
          console.error('Dashboard error', error);

          return res.status(500).json({
               error: 'failed'
          });
     }
};