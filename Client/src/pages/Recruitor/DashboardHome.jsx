import React, { useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import StatCard from "../../components/Recruitor/StatCard";


const DashboardHome = () => {
  const { companyStats, fetchCompanyStats, companyData } =
    useContext(AppContext);
  
  useEffect(() => {
    if (companyData) {
      fetchCompanyStats();
    }
  }, [companyData]);


  if (companyData && !companyStats) {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh]">
      <p className="text-xl text-gray-600">Loading dashboard stats...</p>
         <div className="flex justify-center items-center h-[60vh]">
      <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-5 border-gray-400  border-t-blue-600"></div>
    </div>
    </div>
  );
}

  if (!companyStats) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
      <p className="text-xl sm:text-2xl "> No stats available for this company </p>
    </div>
    );
  }

  const {
    totalJobs,
    visibleJobs,
    hiddenJobs,
    totalApplications,
    pending,
    accepted,
    rejected,
    categoryStats,
  } = companyStats;

  return (
    <div className="container max-w-5xl p-4 ">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        Dashboard Overview
      </h1>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        <StatCard label="Total Jobs" value={totalJobs} color="blue" />
        <StatCard label="Visible Jobs" value={visibleJobs} color="green" />
        <StatCard label="Hidden Jobs" value={hiddenJobs} color="gray" />
        <StatCard
          label="Total Applications"
          value={totalApplications}
          color="indigo"
        />
      </div>

      {/* Applications Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
        <StatCard label="Pending Applications" value={pending} color="yellow" />
        <StatCard
          label="Accepted Applications"
          value={accepted}
          color="green"
        />
        <StatCard label="Rejected Applications" value={rejected} color="red" />
      </div>

      {/* Category Distribution */}
      <div className="bg-white shadow p-5 rounded-lg border">
        <h2 className="text-xl font-semibold mb-3 text-gray-800">
          Jobs by Category
        </h2>
        <ul className="space-y-2">
          {Object.entries(categoryStats).map(([category, count], i) => (
            <li
              key={i}
              className="flex justify-between text-gray-700 border-b pb-2"
            >
              <span className="capitalize text-lg font-medium ">{category}</span>
              <span className="font-semibold">{count}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};



export default DashboardHome;
