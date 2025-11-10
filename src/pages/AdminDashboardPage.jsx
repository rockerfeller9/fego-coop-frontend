// src/pages/AdminDashboardPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminDashboardPage = () => {
  const [pendingLoans, setPendingLoans] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem('fegoToken');

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/loans', {
        headers: { 'x-auth-token': token }
      });
      setPendingLoans(res.data.filter(loan => loan.status === 'Pending'));
      setLoading(false);
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.msg || 'Failed to fetch loans');
      setLoading(false);
      if (err.response?.status === 403) {
        setMessage('Access denied. Admin only.');
        setTimeout(() => navigate('/dashboard'), 2000);
      }
    }
  };

  const handleApprove = async (loanId) => {
    try {
      const res = await axios.patch(
        `http://localhost:5000/api/admin/loans/${loanId}/approve`,
        {},
        { headers: { 'x-auth-token': token } }
      );
      setMessage(res.data.msg || 'Loan approved');
      fetchLoans(); // Refresh list
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.msg || 'Failed to approve loan');
    }
  };

  const handleReject = async (loanId) => {
    try {
      const res = await axios.patch(
        `http://localhost:5000/api/admin/loans/${loanId}/reject`,
        {},
        { headers: { 'x-auth-token': token } }
      );
      setMessage(res.data.msg || 'Loan rejected');
      fetchLoans(); // Refresh list
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.msg || 'Failed to reject loan');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('fegoToken');
    navigate('/login');
  };

  if (loading) return <h2>Loading Admin Dashboard...</h2>;

  return (
    <div style={{ maxWidth: 900, margin: '20px auto' }}>
      <h2>Admin Dashboard - Pending Loans</h2>
      {message && <p style={{ color: message.includes('denied') ? 'red' : 'green' }}>{message}</p>}
      
      {pendingLoans.length === 0 && <p>No pending loans.</p>}
      
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 20 }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #333' }}>
            <th style={{ padding: 10, textAlign: 'left' }}>Membership ID</th>
            <th style={{ padding: 10, textAlign: 'left' }}>Amount</th>
            <th style={{ padding: 10, textAlign: 'left' }}>Purpose</th>
            <th style={{ padding: 10, textAlign: 'left' }}>Period (mo)</th>
            <th style={{ padding: 10, textAlign: 'left' }}>Date</th>
            <th style={{ padding: 10, textAlign: 'center' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pendingLoans.map(loan => (
            <tr key={loan._id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: 10 }}>{loan.membershipId}</td>
              <td style={{ padding: 10 }}>NGN {loan.amountRequested}</td>
              <td style={{ padding: 10 }}>{loan.purpose}</td>
              <td style={{ padding: 10 }}>{loan.repaymentPeriod}</td>
              <td style={{ padding: 10 }}>{new Date(loan.createdAt).toLocaleDateString()}</td>
              <td style={{ padding: 10, textAlign: 'center' }}>
                <button onClick={() => handleApprove(loan._id)} style={{ marginRight: 8 }}>
                  Approve
                </button>
                <button onClick={() => handleReject(loan._id)}>
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: 20 }}>
        <button onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
        <button onClick={handleLogout} style={{ marginLeft: 10 }}>Logout</button>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
