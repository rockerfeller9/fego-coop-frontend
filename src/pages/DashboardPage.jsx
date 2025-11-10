import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const [userData, setUserData] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchProfile = useCallback(async () => {
    try {
      const token = localStorage.getItem('fegoToken');
      if (!token) throw new Error('No auth token');
      const res = await axios.get('http://localhost:5000/api/users/profile', {
        headers: { 'x-auth-token': token }
      });
      setUserData(res.data);
    } catch (e) {
      setError(e.response?.data?.msg || e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchNotificationCount = useCallback(async () => {
    try {
      const token = localStorage.getItem('fegoToken');
      if (!token) return;
      const res = await axios.get('http://localhost:5000/api/users/notifications', {
        headers: { 'x-auth-token': token }
      });
      const count = (res.data || []).filter(n => !n.isRead).length;
      setUnreadCount(count);
    } catch (e) {
      console.error('Failed to fetch notifications:', e);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
    fetchNotificationCount();

    const id = setInterval(fetchNotificationCount, 15000);
    const onVis = () => {
      if (document.visibilityState === 'visible') fetchNotificationCount();
    };
    document.addEventListener('visibilitychange', onVis);

    return () => {
      clearInterval(id);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [fetchProfile, fetchNotificationCount]);

  useEffect(() => {
    const ref = new URLSearchParams(window.location.search).get('reference');
    if (ref) verifyPayment(ref);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const verifyPayment = async (reference) => {
    const token = localStorage.getItem('fegoToken');
    if (!token) return;
    try {
      const res = await axios.get(`http://localhost:5000/api/paystack/verify-payment/${reference}`, {
        headers: { 'x-auth-token': token }
      });
      console.log('Verify:', res.data);
      fetchProfile();
    } catch (e) {
      console.error('Verify error', e.response?.data || e.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('fegoToken');
    navigate('/login');
  };

  if (loading) return <h2>Loading Dashboard...</h2>;
  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
        <button onClick={handleLogout}>Go to Login</button>
      </div>
    );
  }

  const financialSummary = (
    <div style={{ border: '1px solid #ccc', padding: '15px', marginTop: '20px' }}>
      <h3>Financial Summary (Statement)</h3>
      <p><strong>Total Contributions:</strong> NGN {Number(userData?.totalContributions || 0).toFixed(2)}</p>
      <p><strong>Current Loan Balance:</strong> NGN {Number(userData?.currentLoanBalance || 0).toFixed(2)}</p>
      <p><strong>Projects Invested In:</strong> {Array.isArray(userData?.investmentsInProjects) ? userData.investmentsInProjects.length : 0}</p>
      <Link to="/history" style={{ display: 'inline-block', marginTop: 10 }}>View Detailed History</Link>
    </div>
  );

  return (
    <div style={{ maxWidth: 800, margin: '20px auto' }}>
      <div style={{ float: 'right', marginRight: '20px' }}>
        <Link to="/notifications">🔔 Notifications ({unreadCount} unread)</Link>
      </div>

      <h2>Welcome, {userData?.fullName}!</h2>
      <Link to="/profile" style={{ marginBottom: '15px', display: 'block' }}>Edit Profile</Link>

      {userData && (
        <div style={{ border: '1px solid #ccc', padding: 15, marginTop: 15 }}>
          <p><strong>Membership ID:</strong> {userData.membershipId}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Synced:</strong> {userData.isSynced ? 'Yes' : 'No'}</p>
        </div>
      )}

      {financialSummary}

      {userData?.isSynced && (
        <div style={{ marginTop: 20 }}>
          <Link to="/apply-loan"><button>Apply for a New Loan</button></Link>
          <Link to="/contribute" style={{ marginLeft: 10 }}><button>Make a Contribution</button></Link>
          <Link to="/invest" style={{ marginLeft: 10 }}><button>Invest in Projects</button></Link>
          <Link to="/profile" style={{ marginLeft: 10 }}><button>Edit Profile</button></Link>
          <button onClick={handleLogout} style={{ marginLeft: 10 }}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;