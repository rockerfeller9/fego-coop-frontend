import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import LoanApplicationPage from "./pages/LoanApplicationPage";
import NotificationPage from "./pages/NotificationPage";

export default function App() {
  return (
    <ChakraProvider>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/loan-application" element={<LoanApplicationPage />} />
        <Route path="/notifications" element={<NotificationPage />} />
      </Routes>
    </ChakraProvider>
  );
}
