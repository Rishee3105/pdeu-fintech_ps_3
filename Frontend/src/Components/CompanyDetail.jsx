// src/Components/CompanyDetail.js

import React from "react";

const CompanyDetail = ({ company }) => {
  return (
    <div className="p-4 bg-gray-50 rounded-lg shadow">
      <h2 className="text-2xl font-bold text-gray-800">{company.name}</h2>
      <p className="text-gray-600">Email: {company.email}</p>
      <p className="text-gray-600">Phone: {company.phone}</p>
      <p className="text-gray-600">Address: {company.address}</p>
      <p className="text-gray-600">GST Number: {company.gstNumber}</p>
    </div>
  );
};

export default CompanyDetail;
