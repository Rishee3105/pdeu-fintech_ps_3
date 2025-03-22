// CompanyData.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"; // Import Axios
import CompanyDetail from "../Components/CompanyDetail"; // Import the reusable component

const CompanyData = () => {
  const { id } = useParams();
  const [company, setCompany] = useState(null);

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await axios.get(
          `https://api.example.com/companies/${id}`
        ); // Replace with your API URL
        setCompany(response.data); // Set the company data
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    };

    fetchCompanyData();
  }, [id]);

  if (!company) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-5">
      <CompanyDetail company={company} />
    </div>
  );
};

export default CompanyData;
