import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DEPARTMENTS } from "../assets/assets";
import { Loader2Icon } from "lucide-react";
import { toast } from "react-hot-toast";
import api from "../api/axios";

const EmployeeForm = ({ initalData, onSuccess, onCancle }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const isEditModel = !!initalData;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    if (isEditModel) {
      const pwd = formData.get("password");
      if (!pwd) formData.delete("password");
    }

    try {
      const url = isEditModel
        ? `/employees/${initalData._id || initalData.id}`
        : "/employees";

      const method = isEditModel ? "put" : "post";

      await api[method](url, formData);

      onSuccess ? onSuccess() : navigate("/employees");
    } catch (error) {
      toast.error(error.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-3xl animate-fade-in"
    >
      {/* Personal Information */}
      <div className="card p-5 sm:p-6">
        <h3 className="font-medium mb-6 pb-4 border-b border-slate-100">
          Personal Information
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm text-slate-700">
          <div>
            <label className="block mb-2">First Name</label>
            <input
              type="text"
              name="firstName"
              required
              defaultValue={initalData?.firstName}
            />
          </div>

          <div>
            <label className="block mb-2">Last Name</label>
            <input
              type="text"
              name="lastName"
              required
              defaultValue={initalData?.lastName}
            />
          </div>

          <div>
            <label className="block mb-2">Phone Number</label>
            <input
              type="text"
              name="phone"
              required
              defaultValue={initalData?.phone}
            />
          </div>

          <div>
            <label className="block mb-2">Join Date</label>
            <input
              type="date"
              name="joinDate"
              required
              defaultValue={
                initalData?.joinDate
                  ? new Date(initalData.joinDate)
                      .toISOString()
                      .split("T")[0]
                  : ""
              }
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block mb-2">Bio (Optional)</label>
            <textarea
              name="bio"
              defaultValue={initalData?.bio}
              rows={3}
              placeholder="Brief description"
              className="resize-none"
            />
          </div>
        </div>
      </div>

      {/* Employment Details */}
      <div className="card p-5 sm:p-6">
        <h3 className="text-base font-medium text-slate-900 mb-6 pb-4 border-b border-slate-100">
          Employment Details
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm text-slate-700">
          <div>
            <label className="block mb-2">Department</label>
            <select
              name="department"
              required
              defaultValue={initalData?.department || ""}
            >
              <option value="">Select Department</option>

              {DEPARTMENTS.map((deptName) => (
                <option key={deptName} value={deptName}>
                  {deptName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2">Position</label>
            <input
              name="position"
              required
              defaultValue={initalData?.position}
            />
          </div>

          <div>
            <label className="block mb-2">Basic Salary</label>
            <input
              type="number"
              name="basicSalary"
              required
              defaultValue={initalData?.basicSalary || 0}
              min="0"
              step="0.01"
            />
          </div>

          <div>
            <label className="block mb-2">Allowances</label>
            <input
              type="number"
              name="allowances"
              required
              defaultValue={initalData?.allowances || 0}
              min="0"
              step="0.01"
            />
          </div>

          <div>
            <label className="block mb-2">Deductions</label>
            <input
              type="number"
              name="deductions"
              required
              defaultValue={initalData?.deductions || 0}
              min="0"
              step="0.01"
            />
          </div>

          {isEditModel && (
            <div>
              <label className="block mb-2">Status</label>
              <select
                name="employmentStatus"
                required
                defaultValue={initalData?.employmentStatus}
              >
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Account Setup */}
      <div className="card p-5 sm:p-6">
        <h3 className="font-medium text-base text-slate-900 mb-6 pb-4 border-b border-slate-100">
          Account Setup
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm text-slate-700">
          <div className="sm:col-span-2">
            <label className="block mb-2">Work Email</label>
            <input
              type="email"
              name="email"
              required
              defaultValue={initalData?.email}
            />
          </div>

          {!isEditModel && (
            <div>
              <label className="block mb-2">Temporary Password</label>
              <input
                type="password"
                name="password"
                required
              />
            </div>
          )}

          {isEditModel && (
            <div>
              <label className="block mb-2">
                Change Password (Optional)
              </label>
              <input
                type="password"
                name="password"
                placeholder="Leave blank to keep current"
              />
            </div>
          )}

          <div>
            <label className="block mb-2">System Role</label>
            <select
              name="role"
              required
              defaultValue={initalData?.user?.role || "EMPLOYEE"}
            >
              <option value="EMPLOYEE">Employee</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-2">
        <button
          type="button"
          className="btn-secondary"
          onClick={() =>
            onCancle ? onCancle() : navigate(-1)
          }
        >
          Cancel
        </button>

        <button
          type="submit"
          className="btn-primary flex items-center justify-center"
          disabled={loading}
        >
          {loading && (
            <Loader2Icon className="w-4 h-4 mr-2 animate-spin" />
          )}

          {isEditModel
            ? "Update Employee"
            : "Create Employee"}
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;