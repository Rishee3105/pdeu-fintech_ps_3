// src/pages/Companies.jsx

import React, { useEffect, useState } from "react";
import axios from "axios"; // Import Axios
import CompanyCard from "../Components/ComapanyCard"; // Import the CompanyCard component

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading status

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get("http://localhost:3000/companies"); // Replace with your API URL
        setCompanies(response.data); // Set the companies data
      } catch (error) {
        console.error("Error fetching companies:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchCompanies();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-lg text-gray-700">Loading companies...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-5 bg-gray-50">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Companies List
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {companies.map((company) => (
          <CompanyCard key={company.id} company={company} />
        ))}
      </div>
    </div>
  );
};

export default Companies;
