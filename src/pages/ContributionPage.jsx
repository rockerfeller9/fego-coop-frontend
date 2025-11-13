import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { http } from '../lib/http';

const ContributionPage = () => {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePay = async () => {
    const token = localStorage.getItem('fegoToken');
    if (!token) return navigate('/login');
    if (!amount || Number(amount) <= 0) return alert('Enter a valid amount');

    setLoading(true);
    try {
      const res = await http.post(
        '/api/paystack/initialize-contribution',
        { amount: Number(amount) },
        { headers: { 'x-auth-token': token } }
      );
      const { authorization_url } = res.data || {};
      if (!authorization_url) throw new Error('No authorization URL from server');
      window.location.href = authorization_url;
    } catch (e) {
      console.error(e);
      alert(e.response?.data?.msg || 'Failed to start payment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: '30px auto' }}>
      <h2>Make a Contribution</h2>
      <input
        type="number"
        placeholder="Amount (NGN)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{ width: '100%', padding: 10, marginBottom: 12 }}
      />
      <button onClick={handlePay} disabled={loading}>
        {loading ? 'Redirecting…' : 'Pay with Paystack'}
      </button>
      <button onClick={() => navigate('/dashboard')} style={{ marginLeft: 10 }}>
        Cancel
      </button>
    </div>
  );
};

export default ContributionPage;