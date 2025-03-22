import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-indigo-600 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-extrabold">
          Compliance Management System
        </div>
        <div className="flex space-x-8">
          <Link
            to="/companies"
            className="text-white text-lg font-medium hover:text-indigo-300"
          >
            Clients
          </Link>
          <span className="text-white text-lg font-medium hover:text-indigo-300 cursor-pointer">
            Reports
          </span>
          <span className="text-white text-lg font-medium hover:text-indigo-300 cursor-pointer">
            Notifications
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
