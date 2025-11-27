import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import theme from "./theme";
import Navbar from "./components/Navbar";

import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import LoanApplicationPage from "./pages/LoanApplicationPage.jsx";
import AdminDashboardPage from "./pages/AdminDashboardPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import ProjectInvestmentPage from "./pages/ProjectInvestmentPage.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <Navbar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/loans" 
          element={
            <PrivateRoute>
              <LoanApplicationPage />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/investments" 
          element={
            <PrivateRoute>
              <ProjectInvestmentPage />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/admin" 
          element={
            <PrivateRoute adminOnly>
              <AdminDashboardPage />
            </PrivateRoute>
          } 
        />
      </Routes>
    </ChakraProvider>
  );
}
