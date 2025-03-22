// src/components/TransactionFilters.jsx
import React from "react";
import DateRangeFilter from "./DateRangeFilter";
import MonthFilter from "./MonthFilter";

const TransactionFilters = ({
  filterType,
  setFilterType,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  selectedMonth,
  setSelectedMonth,
}) => {
  return (
    <div className="flex mb-4">
      <select
        value={filterType}
        onChange={(e) => setFilterType(e.target.value)}
        className="border border-gray-300 rounded-md p-2 mr-2"
      >
        <option value="dateRange">Date Range</option>
        <option value="month">Specific Month</option>
        <option value="lastYear">Last Year</option>
      </select>

      {filterType === "dateRange" && (
        <DateRangeFilter
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />
      )}

      {filterType === "month" && (
        <MonthFilter
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
        />
      )}
    </div>
  );
};

export default TransactionFilters;
