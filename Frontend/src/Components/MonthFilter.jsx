// src/components/MonthFilter.jsx
import React from "react";

const MonthFilter = ({ selectedMonth, setSelectedMonth }) => {
  return (
    <select
      value={selectedMonth}
      onChange={(e) => setSelectedMonth(e.target.value)}
      className="border border-gray-300 rounded-md p-2 mr-2"
    >
      <option value="">Select Month</option>
      {Array.from({ length: 12 }, (_, i) => (
        <option key={i} value={i}>
          {new Date(0, i).toLocaleString("default", { month: "long" })}
        </option>
      ))}
    </select>
  );
};

export default MonthFilter;
