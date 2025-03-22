// src/pages/CompanyData.jsx

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios"; // Import Axios
import CompanyDetail from "../Components/CompanyDetail"; // Import the reusable component
import TransactionTable from "../Components/TransactionTable"; // Import TransactionTable component

const CompanyData = () => {
  const { id } = useParams();
  const [company, setCompany] = useState(null);

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/companies/${id}` // Fetching company data along with transactions
        );
        setCompany(response.data); // Set the company data
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    };

    fetchCompanyData();
  }, [id]);

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
      <TransactionTable transactions={company.transactions} />
    </div>
  );
};

export default CompanyData;
