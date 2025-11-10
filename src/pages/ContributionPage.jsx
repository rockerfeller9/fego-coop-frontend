import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ContributionPage = () => {
  const [amount, setAmount] = useState('');
  const [membershipId, setMembershipId] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem('fegoToken');
        if (!token) return;
        const res = await axios.get('http://localhost:5000/api/users/profile', {
          headers: { 'x-auth-token': token }
        });
        setMembershipId(res.data.membershipId || '');
        setEmail(res.data.email || '');
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  const initializePayment = async (e) => {
    e.preventDefault();
    setMessage('');
    const numAmt = Number(amount);
    if (!numAmt || numAmt <= 0) {
      setMessage('Enter a valid amount.');
      return;
    }
    setLoading(true);
    try {
      const token = localStorage.getItem('fegoToken');
      const res = await axios.post(
        'http://localhost:5000/api/paystack/initialize-payment',
        { amount: numAmt, email, membershipId },
        { headers: { 'x-auth-token': token, 'Content-Type': 'application/json' } }
      );
      const url = res.data.url;
      if (url) {
        window.location.href = url; // redirect to Paystack checkout
      } else {
        setMessage('Failed to get authorization url.');
      }
    } catch (e) {
      setMessage(e.response?.data?.msg || 'Payment init failed');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('fegoToken');
    location.href = '/login';
  };

  return (
    <div style={{ maxWidth: 480, margin: '30px auto' }}>
      <h2>Make a Contribution</h2>
      {message && <p>{message}</p>}
      <form onSubmit={initializePayment}>
        <div style={{ marginBottom: 12 }}>
          <label>Membership ID</label><br />
          <input
            type="text"
            value={membershipId}
            readOnly
            style={{ width: '100%', padding: 8, background: '#f5f5f5' }}
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Email</label><br />
          <input
            type="email"
            value={email}
            readOnly
            style={{ width: '100%', padding: 8, background: '#f5f5f5' }}
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Amount (NGN)</label><br />
          <input
            type="number"
            min="100"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            style={{ width: '100%', padding: 8 }}
          />
        </div>
        <button type="submit" disabled={loading} style={{ padding: '8px 16px' }}>
          {loading ? 'Processing...' : 'Proceed to Paystack'}
        </button>
      </form>
      <p style={{ fontSize: 12, marginTop: 10 }}>
        You will be redirected to Paystack to complete payment.
      </p>
      <button type="button" onClick={handleLogout} style={{ padding: '8px 16px' }}>
        Logout
      </button>
    </div>
  );
};

export default ContributionPage;