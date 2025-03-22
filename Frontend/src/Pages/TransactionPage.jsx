import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import TransactionForm from "../Components/TransactionForm";

const TransactionPage = () => {
  const { companyId } = useParams();
  const [transactions, setTransactions] = useState([]);

  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };

  const validateTransactions = async () => {
    if (transactions.length === 0) {
      alert("No transactions to validate.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:3000/companies/${companyId}/transactions/batch`,
        transactions
      );
      console.log(
        "Transactions validated and uploaded successfully:",
        response.data
      );
      alert("Transactions validated and uploaded successfully!");

      // Clear the transactions state after successful validation
      setTransactions([]);
    } catch (error) {
      console.error("Error validating transactions:", error);
      alert("Error validating transactions.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Transaction Management
      </h1>
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <TransactionForm addTransaction={addTransaction} />
      </div>
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">
        Transaction List
      </h3>
      <div className="overflow-x-auto mb-4">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr>
              <th className="py-3 px-5 bg-indigo-200 text-left text-sm font-bold text-gray-700">
                Source
              </th>
              <th className="py-3 px-5 bg-indigo-200 text-left text-sm font-bold text-gray-700">
                Destination
              </th>
              <th className="py-3 px-5 bg-indigo-200 text-left text-sm font-bold text-gray-700">
                Actual Cost
              </th>
              <th className="py-3 px-5 bg-indigo-200 text-left text-sm font-bold text-gray-700">
                Cost with Tax
              </th>
              <th className="py-3 px-5 bg-indigo-200 text-left text-sm font-bold text-gray-700">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr
                key={index}
                className="border-t border-gray-300 hover:bg-gray-100 transition duration-150"
              >
                <td className="py-3 px-5">
                  <span className="font-medium">{transaction.sourceState}</span>{" "}
                  <span className="text-sm text-gray-600">
                    ({transaction.sourceCountry})
                  </span>
                </td>
                <td className="py-3 px-5">
                  <span className="font-medium">{transaction.destState}</span>{" "}
                  <span className="text-sm text-gray-600">
                    ({transaction.destCountry})
                  </span>
                </td>
                <td className="py-3 px-5">{transaction.actualCost}</td>
                <td className="py-3 px-5">{transaction.costWithTax}</td>
                <td className="py-3 px-5">{transaction.transactionDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        onClick={validateTransactions}
        className="w-full py-3 px-5 mt-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        Upload Final Data
      </button>
    </div>
  );
};

export default TransactionPage;
