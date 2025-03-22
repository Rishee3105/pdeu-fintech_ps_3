// src/pages/CompanyFormPage.js

import React from "react";
import CompanyForm from "../Components/CompanyForm";

const CompanyFormPage = () => {
  // This function will handle the addition of a new company
  const handleAddCompany = (newCompany) => {
    console.log("New company added:", newCompany);
    // Logic to update the company list, e.g., state updates or API calls
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Register a New Company</h1>
      <CompanyForm addCompany={handleAddCompany} />{" "}
      {/* Ensure addCompany is passed as a prop */}
    </div>
  );
};

export default CompanyFormPage;
