import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AddBook from "./pages/AddBook";

function App() {
  return (
    <Router>
      <div className="min-h-screen p-6 bg-gray-100">
        {/* Navbar Component */}
        <Navbar />
        
        {/* Page Content */}
        <div className="mt-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-book" element={<AddBook />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
