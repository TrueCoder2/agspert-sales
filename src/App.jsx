import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/LoginPage"
import Dashboard from "./components/Dashboard";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
   
      <Routes>
        <Route path="/login" element={<Login setAuth={setIsAuthenticated} />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    
  );
}

export default App;