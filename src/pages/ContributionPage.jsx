import React, { useState } from 'react';
import { http } from '../lib/http';
import { useNavigate } from 'react-router-dom';

const ContributionPage = () => {
  const [amount, setAmount] = useState('');
  const navigate = useNavigate();

  const handlePayment = async () => {
    const token = localStorage.getItem('fegoToken');
    if (!token || !amount) return alert('Please enter amount');

    try {
      const res = await http.post('/api/paystack/initialize-contribution', 
        { amount: parseFloat(amount) },
        { headers: { 'x-auth-token': token } }
      );

      const { authorization_url } = res.data;
      window.location.href = authorization_url; // Paystack handles popup/redirect
    } catch (e) {
      console.error(e);
      alert('Payment initialization failed');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '30px auto' }}>
      <h2>Make a Contribution</h2>
      <input 
        type="number" 
        placeholder="Amount (NGN)" 
        value={amount} 
        onChange={e => setAmount(e.target.value)} 
        style={{ width: '100%', marginBottom: 10 }}
      />
      <button onClick={handlePayment}>Pay with Paystack</button>
      <button onClick={() => navigate('/dashboard')} style={{ marginLeft: 10 }}>Cancel</button>
    </div>
  );
};

export default ContributionPage;