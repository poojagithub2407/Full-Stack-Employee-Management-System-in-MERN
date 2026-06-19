import React, { useCallback, useEffect, useState } from "react";
import Loading from "../components/Loading";
import PayslipList from "../components/payslips/PayslipList";
import GeneratePalslipform from "../components/payslips/GeneratePalslipform";
import { useAuth } from "../context/auth.context";
import api from "../api/axios";
import toast from "react-hot-toast";

const Payslips = () => {
     const [paySlips, setPaySlips] = useState([]);
     const [employees, setEmployees] = useState([]);
     const [loading, setLoading] = useState(true);

     const { user } = useAuth();
     const isAdmin = user?.role === "ADMIN";

     const fetchPaySlips = useCallback(async () => {
          try {
               const res = await api.get("/payslips");
               setPaySlips(res.data.data || []);
          } catch (error) {
               toast.error(error?.response?.data?.error || error.message);
          } finally {
               setLoading(false);
          }
     }, []);

     useEffect(() => {
          fetchPaySlips();
     }, [fetchPaySlips]);

     useEffect(() => {
          if (isAdmin) {
               api
                    .get("/employees")
                    .then((res) => {
                         const employeesData = res.data.data || res.data || [];
                         setEmployees(
                              employeesData.filter((employee) => !employee.isDeleted)
                         );
                    })
                    .catch((error) => {
                         console.error(error);
                    });
          }
     }, [isAdmin]);

     if (loading) return <Loading />;

     return (
          <div className="animate-fade-in">
               <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div>
                         <h1 className="page-title">Payslips</h1>

                         <p className="page-subtitle">
                              {isAdmin
                                   ? "Generate and manage employee payslips"
                                   : "Your payslip history"}
                         </p>
                    </div>

                    {isAdmin && (
                         <GeneratePalslipform
                              employees={employees}
                              onSuccess={fetchPaySlips}
                         />
                    )}
               </div>

               <PayslipList paySlips={paySlips} isAdmin={isAdmin} />
          </div>
     );
};

export default Payslips;