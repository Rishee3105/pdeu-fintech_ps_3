// src/pages/CompanyData.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import CompanyDetail from "../Components/CompanyDetail";
import TransactionTable from "../Components/TransactionTable";
import TransactionFilters from "../Components/TransactionsFilters";

const CompanyData = () => {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [filterType, setFilterType] = useState("dateRange");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/companies/${id}`
        );
        setCompany(response.data);
        setFilteredTransactions(response.data.transactions);
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    };

    fetchCompanyData();
  }, [id]);

  const handleFilter = () => {
    if (!company) return;

    let filtered = [...company.transactions];

    if (filterType === "dateRange") {
      filtered = filtered.filter((transaction) => {
        const transactionDate = new Date(transaction.transactionDate);
        const isAfterStartDate = startDate
          ? transactionDate >= new Date(startDate)
          : true;
        const isBeforeEndDate = endDate
          ? transactionDate <= new Date(endDate)
          : true;
        return isAfterStartDate && isBeforeEndDate;
      });
    } else if (filterType === "month") {
      filtered = filtered.filter((transaction) => {
        const transactionDate = new Date(transaction.transactionDate);
        return (
          transactionDate.getMonth() === parseInt(selectedMonth) &&
          transactionDate.getFullYear() === new Date().getFullYear()
        );
      });
    } else if (filterType === "lastYear") {
      filtered = filtered.filter((transaction) => {
        const transactionDate = new Date(transaction.transactionDate);
        const lastYear = new Date();
        lastYear.setFullYear(lastYear.getFullYear() - 1);
        return transactionDate >= lastYear;
      });
    }

    setFilteredTransactions(filtered);
  };

  if (!company) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-lg text-gray-700">Loading company data...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-5 bg-white rounded-lg shadow-md">
      <CompanyDetail company={company} />
      <div className="flex justify-between mt-6 mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Transactions</h2>
        <div>
          <Link to={`/manualTransactionForm/${company.id}`}>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-600 transition duration-200">
              Add New Transaction Manually
            </button>
          </Link>
          <Link to={`/uploadTransactionFile/${company.id}`}>
            <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200">
              Add New Transactions File
            </button>
          </Link>
        </div>
      </div>
      <TransactionFilters
        filterType={filterType}
        setFilterType={setFilterType}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
      />
      <button
        onClick={handleFilter}
        className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-200 mb-4"
      >
        Filter
      </button>
      <TransactionTable transactions={filteredTransactions} />
    </div>
  );
};

export default CompanyData;
