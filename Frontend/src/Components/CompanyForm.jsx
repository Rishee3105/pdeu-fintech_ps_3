// src/components/CompanyForm.js

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CompanyForm = ({ addCompany }) => {
  const [company, setCompany] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    gstNumber: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCompany({
      ...company,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/companies", // Replace with your API URL
        company
      );
      addCompany(response.data); // Call the addCompany function passed as a prop
      setCompany({
        name: "",
        email: "",
        phone: "",
        address: "",
        gstNumber: "",
      }); // Reset form

      // Redirect to /companies after successful submission
      navigate("/companies");
    } catch (error) {
      console.error("Error adding company:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-xl font-bold mb-4">Register a New Company</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Company Name:</label>
        <input
          type="text"
          name="name"
          value={company.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Email:</label>
        <input
          type="email"
          name="email"
          value={company.email}
          onChange={handleChange}
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Phone:</label>
        <input
          type="tel"
          name="phone"
          value={company.phone}
          onChange={handleChange}
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Address:</label>
        <input
          type="text"
          name="address"
          value={company.address}
          onChange={handleChange}
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">GST Number:</label>
        <input
          type="text"
          name="gstNumber"
          value={company.gstNumber}
          onChange={handleChange}
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
      >
        Add Company
      </button>
    </form>
  );
};

export default CompanyForm;
