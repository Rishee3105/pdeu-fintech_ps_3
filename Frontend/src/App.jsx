import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Companies from "./Pages/Companies";
import CompanyData from "./Pages/CompanyData";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/companies" element={<Companies />} />
        <Route path="/companyData/:id" element={<CompanyData />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
