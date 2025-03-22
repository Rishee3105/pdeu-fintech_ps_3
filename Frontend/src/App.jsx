import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Companies from "./Pages/Companies";
import CompanyData from "./Pages/CompanyData";
import CompanyPage from "./Pages/CompanyFormPage";
import ExcelFileUpload from "./Pages/ExcelFileUpload";
import TransactionPage from "./Pages/TransactionPage";
import Navbar from "./Components/Navbar";
import ValidationReport from "./Pages/ValidationReport";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/companies" element={<Companies />} />
        <Route path="/companyData/:id" element={<CompanyData />} />
        <Route path="/companyForm" element={<CompanyPage />} />
        <Route
          path="/manualTransactionForm/:companyId"
          element={<TransactionPage />}
        />
        <Route
          path="/uploadTransactionFile/:companyId"
          element={<ExcelFileUpload />}
        />
        <Route path="/manualTransactionForm" element={<TransactionPage />} />
        <Route path="/validation-report/:id" element={<ValidationReport />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
