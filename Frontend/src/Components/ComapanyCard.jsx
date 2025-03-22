import React from "react";
import { Link } from "react-router-dom";

const CompanyCard = ({ company }) => {
  return (
    <Link
      to={`/companyData/${company.id}`}
      className="bg-white border rounded-lg shadow-md p-4 m-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 hover:shadow-lg transition-shadow duration-200"
    >
      <h3 className="text-lg font-semibold text-gray-800">
        {company.name}
      </h3>
      <p className="text-gray-600">
        {company.description}
      </p>
    </Link>
  );
};

export default CompanyCard;
