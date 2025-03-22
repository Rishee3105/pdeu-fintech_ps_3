import React, { useState, useRef } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { useParams } from "react-router-dom";

const ExcelFileUpload = () => {
  const { companyId } = useParams();
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [transactions, setTransactions] = useState([]);
  const fileInputRef = useRef(null);

  const requiredColumns = [
    "Source Country",
    "Source State",
    "Destination Country",
    "Destination State",
    "Actual Cost",
    "Cost with Tax",
    "Transaction Date",
  ];

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file || null);
    if (file) {
      validateExcelFile(file);
    }
  };

  const validateExcelFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const sheetData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

      const headers = sheetData[0];
      const missingColumns = requiredColumns.filter(
        (col) => !headers.includes(col)
      );

      if (missingColumns.length > 0) {
        setUploadStatus(
          `Error: Missing columns - ${missingColumns.join(
            ", "
          )}. Required columns are: ${requiredColumns.join(", ")}.`
        );
        setSelectedFile(null);
      } else {
        setUploadStatus("File is valid and ready to upload.");
        setTransactions(
          sheetData.slice(1).map((row) => ({
            sourceCountry: row[0],
            sourceState: row[1],
            destCountry: row[2],
            destState: row[3],
            actualCost: row[4],
            costWithTax: row[5],
            transactionDate: row[6],
          }))
        );
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      alert("No file selected");
      return;
    }

    try {
      await axios.post(
        `http://localhost:3000/companies/${companyId}/transactions/batch`,
        transactions
      );
      setUploadStatus("File uploaded successfully!");
      setSelectedFile(null); // Clear selected file after upload
      setTransactions([]); // Clear transactions after successful upload
    } catch (error) {
      setUploadStatus("Error uploading file.");
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Excel File Upload
      </h1>
      <div className="flex items-center mb-4">
        <button
          onClick={() => fileInputRef.current.click()}
          className="py-2 px-4 mr-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Select Excel File
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          style={{ display: "none" }}
          accept=".xlsx, .xls"
        />
        {selectedFile && (
          <div className="flex items-center">
            <span className="text-sm text-gray-600 mr-4">
              {selectedFile.name} selected
            </span>
            <button
              onClick={handleFileUpload}
              className="py-1 px-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Upload
            </button>
          </div>
        )}
      </div>
      {uploadStatus && (
        <div
          className={`mb-4 px-4 py-2 rounded-md text-sm text-white ${
            uploadStatus.includes("Error") ? "bg-red-500" : "bg-green-500"
          }`}
        >
          {uploadStatus}
        </div>
      )}
      <h3 className="text-lg font-semibold mt-8 text-gray-700">
        Transaction List
      </h3>
      <table className="min-w-full bg-white shadow-md rounded-lg mt-2">
        <thead>
          <tr>
            <th className="py-2 px-4 bg-gray-200 text-left text-sm font-medium text-gray-700">
              Source
            </th>
            <th className="py-2 px-4 bg-gray-200 text-left text-sm font-medium text-gray-700">
              Destination
            </th>
            <th className="py-2 px-4 bg-gray-200 text-left text-sm font-medium text-gray-700">
              Actual Cost
            </th>
            <th className="py-2 px-4 bg-gray-200 text-left text-sm font-medium text-gray-700">
              Cost with Tax
            </th>
            <th className="py-2 px-4 bg-gray-200 text-left text-sm font-medium text-gray-700">
              Date
            </th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index} className="border-t border-gray-200">
              <td className="py-2 px-4">
                {transaction.sourceState} ({transaction.sourceCountry})
              </td>
              <td className="py-2 px-4">
                {transaction.destState} ({transaction.destCountry})
              </td>
              <td className="py-2 px-4">{transaction.actualCost}</td>
              <td className="py-2 px-4">{transaction.costWithTax}</td>
              <td className="py-2 px-4">{transaction.transactionDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExcelFileUpload;
