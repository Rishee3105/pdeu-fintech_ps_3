// src/Components/CompanyCard.js

import React from "react";
import { Link } from "react-router-dom";

const CompanyCard = ({ company }) => {
  return (
    <Link
      to={`/companyData/${company.id}`} // Link to the company details page
      className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-5 transform hover:translate-y-[-5px]"
    >
      <h3 className="text-xl font-semibold text-blue-600 mb-2">
        {company.name}
      </h3>
      <div className="space-y-1">
        <p className="text-gray-700">
          <span className="font-medium">Email:</span> {company.email}
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Phone no.:</span> {company.phone}
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Address:</span> {company.address}
        </p>
        <p className="text-gray-700">
          <span className="font-medium">GST No:</span> {company.gstNumber}
        </p>
      </div>
    </Link>
  );
};

export default CompanyCard;
