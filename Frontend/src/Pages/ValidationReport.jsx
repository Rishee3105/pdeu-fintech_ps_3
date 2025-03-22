import React from "react";
import { useLocation } from "react-router-dom";
import TransactionTable from "../Components/TransactionTable"; // Reuse TransactionTable

const ValidationReport = () => {
  const location = useLocation();
  const { transactions, acceptedCount, rejectedCount, rejectedTransactions } =
    location.state || {};

  return (
    <div className="max-w-4xl mx-auto p-5 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Validation Report
      </h2>
      <p className="mb-4">Total Accepted Transactions: {acceptedCount}</p>
      <p className="mb-4">Total Rejected Transactions: {rejectedCount}</p>

      {transactions && transactions.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mt-6">
            Accepted Transactions
          </h3>
          <TransactionTable
            transactions={transactions.filter((t) => t.status === "Accepted")}
          />
        </div>
      )}

      {rejectedTransactions.length > 0 && (
        <>
          <h3 className="text-xl font-semibold text-gray-700 mt-6">
            Rejected Transactions
          </h3>
          <TransactionTable transactions={rejectedTransactions} />
        </>
      )}
    </div>
  );
};

export default ValidationReport;
