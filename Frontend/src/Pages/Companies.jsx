// Companies.jsx
import React, { useEffect, useState } from "react";
import axios from "axios"; // Import Axios
import CompanyCard from "../Components/ComapanyCard"; // Import the CompanyCard component

const companies = [{}];

const Companies = () => {
  // const [companies, setCompanies] = useState([]);

  // useEffect(() => {
  //   const fetchCompanies = async () => {
  //     try {
  //       const response = await axios.get("https://api.example.com/companies"); // Replace with your API URL
  //       setCompanies(response.data); // Set the companies data
  //     } catch (error) {
  //       console.error("Error fetching companies:", error);
  //     }
  //   };

  //   fetchCompanies();
  // }, []);

  return (
    <div className="flex flex-wrap justify-around p-5">
      {companies.map((company) => (
        <CompanyCard key={company.id} company={company} />
      ))}
    </div>
  );
};

export default Companies;
