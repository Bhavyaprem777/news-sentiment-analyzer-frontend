import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Analyzer from "./pages/Analyzer";
import History from "./pages/History";
import Login from "./pages/Login";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import AdvancedAnalysis from "./pages/AdvancedAnalysis"; // ✅ Import the missing page
import './App.css'; // Ensure this is properly linked to use Tailwind styles
import logo from "./assets/logo.jpg"; // Adjust path as needed

function App() {
  return (
    <Router>
      <div className="App">
        {/* ✅ Header Section */}
        <header className="bg-blue">
          <div className="flex items-center p-4">
            <img src={logo} alt="Logo" className="h-24 w-24 mr-4" />
            <h1 className="text-4xl font-bold text-black flex-grow text-center">NEWS SENTIMENT ANALYZER</h1>
          </div>
        </header>

        {/* ✅ Navigation Bar */}
        <nav className="bg-pink-600 text-white w-full p-4 shadow-md">
          <div className="flex justify-center space-x-6">
            <Link to="/" className="hover:bg-blue-500 px-4 py-2 rounded-md">Home</Link>
            <Link to="/analyze" className="hover:bg-blue-500 px-4 py-2 rounded-md">Analyzer</Link>
            <Link to="/history" className="hover:bg-blue-500 px-4 py-2 rounded-md">History</Link>
            <Link to="/login" className="bg-white text-blue-600 px-4 py-2 rounded-lg shadow hover:bg-gray-200">
              Login / Sign Up
            </Link>
          </div>
        </nav>

        {/* ✅ Page Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analyze" element={<Analyzer />} />
          <Route path="/history" element={<History />} />
          <Route path="/login" element={<Login />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/advanced-analysis" element={<AdvancedAnalysis />} /> {/* ✅ Added this route */}
        </Routes>

        {/* ✅ Footer Section */}
        <footer className="bg-gray-800 text-white text-center p-4">
          <div className="footer-links space-x-6">
            <Link to="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-white">Terms of Service</Link>
          </div>
          <p>© 2025 News Sentiment Analyzer. All Rights Reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
