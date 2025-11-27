import React from 'react';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children, adminOnly = false }) {
  const token = localStorage.getItem('fegoToken'); // Changed from 'token'
  const role = localStorage.getItem('role');
  
  if (!token) return <Navigate to="/login" replace />;
  if (adminOnly && role !== 'admin') return <Navigate to="/dashboard" replace />;
  
  return children;
}

// Example usage:
// <Route path="/admin-dashboard" element={
//   <PrivateRoute adminOnly={true}><AdminDashboardPage /></PrivateRoute>
// } />