// CompanyDetail.jsx
import React from "react";

const CompanyDetail = ({ company }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4">
      <h2 className="text-2xl font-bold text-gray-800">{company.name}</h2>
      <p className="text-gray-600 mt-2">{company.description}</p>
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Additional Information:</h3>
        <p className="text-gray-500">Location: {company.location}</p>
        <p className="text-gray-500">Contact: {company.contact}</p>
      </div>
    </div>
  );
};

export default CompanyDetail;
