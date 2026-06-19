import { Loader2, Plus, X } from "lucide-react";
import React, { useState } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";

const GeneratePalslipform = ({ employees, onSuccess }) => {
     const [isOpen, setIsOpen] = useState(false);
     const [loading, setLoading] = useState(false);

     if (!isOpen) {
          return (
               <button
                    className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center"
                    onClick={() => setIsOpen(true)}
               >
                    <Plus className="w-4 h-4" />
                    Generate Payslip
               </button>
          );
     }

     const handleSubmit = async (e) => {
          e.preventDefault();
          setLoading(true);

          const formData = new FormData(e.currentTarget);
          const data = Object.fromEntries(formData.entries());

          try {
               await api.post("/payslips", data);

               toast.success("Payslip generated successfully");
               setIsOpen(false);

               if (onSuccess) {
                    onSuccess();
               }
          } catch (error) {
               toast.error(
                    error.response?.data?.error || error?.message || "Failed to generate payslip"
               );
          } finally {
               setLoading(false);
          }
     };

     return (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
               <div className="card max-w-lg w-full p-6 animate-slide-up">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                         <h3 className="text-lg font-bold text-slate-900">
                              Generate Monthly Payslip
                         </h3>

                         <button
                              onClick={() => setIsOpen(false)}
                              className="text-slate-400 hover:text-slate-600 p-1"
                         >
                              <X size={20} />
                         </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                         {/* Employee */}
                         <div>
                              <label className="block text-sm font-medium text-slate-700 mb-2">
                                   Employee
                              </label>

                              <select name="employeeId" required>
                                   <option value="">Select Employee</option>

                                   {employees.map((employee) => (
                                        <option
                                             key={employee._id}
                                             value={employee._id}
                                        >
                                             {employee.firstName} {employee.lastName} -{" "}
                                             {employee.position}
                                        </option>
                                   ))}
                              </select>
                         </div>

                         {/* Month & Year */}
                         <div className="grid grid-cols-2 gap-4">
                              <div>
                                   <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Month
                                   </label>

                                   <select name="month" required>
                                        {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                                             <option key={month} value={month}>
                                                  {month}
                                             </option>
                                        ))}
                                   </select>
                              </div>

                              <div>
                                   <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Year
                                   </label>

                                   <input
                                        type="number"
                                        name="year"
                                        required
                                        defaultValue={new Date().getFullYear()}
                                   />
                              </div>
                         </div>

                         {/* Salary */}
                         <div>
                              <label className="block text-sm font-medium text-slate-700 mb-2">
                                   Basic Salary
                              </label>

                              <input
                                   type="number"
                                   name="basicSalary"
                                   required
                                   placeholder="50000"
                              />
                         </div>

                         {/* Allowances & Deductions */}
                         <div className="grid grid-cols-2 gap-4">
                              <div>
                                   <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Allowances
                                   </label>

                                   <input
                                        type="number"
                                        name="allowances"
                                        defaultValue="0"
                                        placeholder="5000"
                                   />
                              </div>

                              <div>
                                   <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Deductions
                                   </label>

                                   <input
                                        type="number"
                                        name="deductions"
                                        defaultValue="0"
                                        placeholder="1000"
                                   />
                              </div>
                         </div>

                         {/* Actions */}
                         <div className="flex justify-end pt-2 gap-3">
                              <button
                                   type="button"
                                   className="btn-secondary"
                                   onClick={() => setIsOpen(false)}
                              >
                                   Cancel
                              </button>

                              <button
                                   type="submit"
                                   className="btn-primary flex items-center"
                                   disabled={loading}
                              >
                                   {loading && (
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                   )}
                                   Generate
                              </button>
                         </div>
                    </form>
               </div>
          </div>
     );
};

export default GeneratePalslipform;