import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";

const ProtectedRoute = () => {
  const fullName = localStorage.getItem("fullName");
  if (!fullName) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route element={<ProtectedRoute />} >
          <Route path="/home" element={<DashboardPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
