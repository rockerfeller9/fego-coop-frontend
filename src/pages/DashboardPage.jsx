import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { http } from '../lib/http';

const DashboardPage = () => {
  const [userData, setUserData] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProfile = useCallback(async () => {
    try {
      const token = localStorage.getItem('fegoToken');
      if (!token) return navigate('/login');
      const res = await http.get('/api/users/profile', {
        headers: { 'x-auth-token': token }
      });
      setUserData(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const fetchNotificationCount = useCallback(async () => {
    try {
      const token = localStorage.getItem('fegoToken');
      if (!token) return;
      const res = await http.get('/api/users/notifications', {
        headers: { 'x-auth-token': token }
      });
      setUnreadCount((res.data || []).filter(n => !n.isRead).length);
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
    fetchNotificationCount();
  }, [fetchProfile, fetchNotificationCount]);

  if (loading) return <h2>Loading Dashboard...</h2>;

  return (
    <div style={{ maxWidth: 800, margin: '20px auto' }}>
      <div style={{ float: 'right' }}>
        <Link to="/notifications">🔔 {unreadCount} unread</Link>
      </div>
      <h2>Welcome {userData?.fullName}</h2>
      <div style={{ border: '1px solid #ccc', padding: 15, marginTop: 15 }}>
        <p><strong>Email:</strong> {userData?.email}</p>
        <p><strong>Total Contributions:</strong> NGN {Number(userData?.totalContributions || 0).toFixed(2)}</p>
        <p><strong>Current Loan Balance:</strong> NGN {Number(userData?.currentLoanBalance || 0).toFixed(2)}</p>
        <Link to="/history">View Detailed History</Link>
      </div>
      <div style={{ marginTop: 20 }}>
        <Link to="/apply-loan"><button>Apply Loan</button></Link>
        <Link to="/contribute" style={{ marginLeft: 10 }}><button>Contribute</button></Link>
        <Link to="/profile" style={{ marginLeft: 10 }}><button>Profile</button></Link>
        <button style={{ marginLeft: 10 }} onClick={() => { localStorage.removeItem('fegoToken'); navigate('/login'); }}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;