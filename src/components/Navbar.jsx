import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow p-4">
      <div className="max-w-7xl mx-auto flex items-center">
        <Link to="/" className="text-2xl font-bold text-gray-800">
          Librae
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
