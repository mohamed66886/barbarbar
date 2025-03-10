import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Barbers from "./pages/Barbers";
import Services from "./pages/Services";
import Cashier from "./pages/Cashier";
import Dashboard from "./pages/Dashboard"; 
import Reports from "./pages/Reports"; 

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/barbers" element={<Barbers />} />
        <Route path="/services" element={<Services />} />
        <Route path="/cashier" element={<Cashier />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </Router>
  );
}

export default App;
