import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import LoanApplicationPage from './pages/loanApplicationPage.jsx';
import ContributionPage from './pages/ContributionPage.jsx';
import ProjectInvestmentPage from './pages/ProjectInvestmentPage.jsx';
import AdminDashboardPage from './pages/AdminDashboardPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import NotificationPage from './pages/NotificationPage.jsx';
import FinancialHistoryPage from './pages/FinancialHistoryPage.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';

const App = () => (
  <Router>
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Private (Secure) Routes */}
      <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
      <Route path="/apply-loan" element={<PrivateRoute><LoanApplicationPage /></PrivateRoute>} />
      <Route path="/contribute" element={<PrivateRoute><ContributionPage /></PrivateRoute>} />
      <Route path="/invest" element={<PrivateRoute><ProjectInvestmentPage /></PrivateRoute>} />
      <Route path="/admin-dashboard" element={<PrivateRoute><AdminDashboardPage /></PrivateRoute>} />
      <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
      <Route path="/notifications" element={<PrivateRoute><NotificationPage /></PrivateRoute>} />
      <Route path="/history" element={<PrivateRoute><FinancialHistoryPage /></PrivateRoute>} />

      {/* Default */}
      <Route path="/" element={<LoginPage />} />
    </Routes>
  </Router>
);

export default App;
