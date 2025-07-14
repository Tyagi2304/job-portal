import React from 'react'

const StatCard = ({ label, value, color }) => {
  const bg = {
    blue: "bg-blue-100 text-blue-800",
    green: "bg-green-100 text-green-800",
    gray: "bg-gray-100 text-gray-800",
    red: "bg-red-100 text-red-800",
    indigo: "bg-indigo-100 text-indigo-800",
    yellow: "bg-yellow-100 text-yellow-800",
  }[color];

  return (
    <div className={`p-4 rounded-lg shadow-lg border-0.5  ${bg}`}>
      <p className="text-lg pb-2 font-semibold">{label}</p>
      <h2 className="text-2xl font-bold">{value}</h2>
    </div>
  );
};

export default StatCard