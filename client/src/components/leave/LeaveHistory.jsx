import { format } from "date-fns";
import { CheckIcon, Loader2, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import api from "../../api/axios";

const LeaveHistory = ({ leave, isAdmin, onUpdate }) => {
  const [processing, setProcessing] = useState(null);

  const handleStatusUpdate = async (id, status) => {
    setProcessing(id);
    try {
      await api.patch(`/leave/${id}`, { status });
      onUpdate();
    } catch (error) {
      toast.error(error?.response?.data?.error || error?.message)
    } finally {
      setProcessing(null)
    }
  };

  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="table-modern w-full">
          <thead>
            <tr>
              {isAdmin && <th className="px-6 py-4">Employee</th>}
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Dates</th>
              <th className="px-6 py-4">Reason</th>
              <th className="px-6 py-4">Status</th>
              {isAdmin && <th className="px-6 py-4 text-center">Actions</th>}
            </tr>
          </thead>

          <tbody>
            {leave.length === 0 ? (
              <tr>
                <td
                  colSpan={isAdmin ? 6 : 4}
                  className="px-6 py-8 text-center text-slate-500"
                >
                  No leave applications found
                </td>
              </tr>
            ) : (
              leave.map((item) => {
                const leaveId = item._id || item.id;

                return (
                  <tr key={leaveId}>
                    {isAdmin && (
                      <td className="px-6 py-4 text-slate-900">
                        {item.employee?.firstName} {item.employee?.lastName}
                      </td>
                    )}

                    <td className="px-6 py-4">
                      <span className="badge bg-slate-100 text-slate-600">
                        {item.type}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-xs text-slate-500">
                      {format(new Date(item.startDate), "MMM dd")} -{" "}
                      {format(new Date(item.endDate), "MMM dd, yyyy")}
                    </td>

                    <td
                      className="px-6 py-4 max-w-xs truncate text-slate-500"
                      title={item.reason}
                    >
                      {item.reason}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`badge ${item.status === "APPROVED"
                          ? "badge-success"
                          : item.status === "REJECTED"
                            ? "badge-danger"
                            : "badge-warning"
                          }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    {isAdmin && (
                      <td className="px-6 py-4">
                        {item.status === "PENDING" && (
                          <div className="flex justify-center gap-2">
                            <button
                              disabled={!!processing}
                              onClick={() =>
                                handleStatusUpdate(leaveId, "APPROVED")
                              }
                              className="p-1.5 rounded-md bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors"
                            >
                              {processing === leaveId ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <CheckIcon className="w-4 h-4" />
                              )}
                            </button>

                            <button
                              disabled={!!processing}
                              onClick={() =>
                                handleStatusUpdate(leaveId, "REJECTED")
                              }
                              className="p-1.5 rounded-md bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors"
                            >
                              {processing === leaveId ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <X className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        )}
                      </td>
                    )}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveHistory;
