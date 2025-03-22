// src/components/DateRangeFilter.jsx
import React from "react";

const DateRangeFilter = ({ startDate, setStartDate, endDate, setEndDate }) => {
  return (
    <div className="flex">
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="border border-gray-300 rounded-md p-2 mr-2"
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="border border-gray-300 rounded-md p-2 mr-2"
      />
    </div>
  );
};

export default DateRangeFilter;
