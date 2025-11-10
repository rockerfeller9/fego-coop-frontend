// src/pages/LoanApplicationPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoanApplicationPage = () => {
  const [membershipId, setMembershipId] = useState('');
  const [email, setEmail] = useState('');
  const [amountRequested, setAmountRequested] = useState('');
  const [purpose, setPurpose] = useState('');
  const [repaymentPeriod, setRepaymentPeriod] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

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
        setMessage('Failed to load profile.');
      }
    })();
  }, []);

  const submitLoan = async (e) => {
    e.preventDefault();
    setMessage('');
    const amt = Number(amountRequested);
    const months = Number(repaymentPeriod);
    if (!amt || amt <= 0) return setMessage('Enter a valid loan amount.');
    if (!months || months <= 0) return setMessage('Enter a valid repayment period (months).');
    if (!purpose.trim()) return setMessage('Enter a loan purpose.');

    try {
      setSubmitting(true);
      const token = localStorage.getItem('fegoToken');
      const res = await axios.post(
        // If your backend uses a different endpoint (e.g., /api/loans), update this path.
        'http://localhost:5000/api/loans/apply',
        { membershipId, amountRequested: amt, purpose, repaymentPeriod: months },
        { headers: { 'x-auth-token': token, 'Content-Type': 'application/json' } }
      );
      setMessage(res.data.msg || 'Loan application submitted.');
      // Optional: navigate to dashboard after a short delay
      setTimeout(() => navigate('/dashboard'), 800);
    } catch (e) {
      console.error(e);
      setMessage(e.response?.data?.msg || 'Loan application failed.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: 520, margin: '30px auto' }}>
      <h2>Apply for a Loan</h2>
      {message && <p>{message}</p>}
      <form onSubmit={submitLoan}>
        <div style={{ marginBottom: 12 }}>
          <label>Membership ID</label><br />
          <input type="text" value={membershipId} readOnly style={{ width: '100%', padding: 8, background: '#f5f5f5' }} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Email</label><br />
          <input type="email" value={email} readOnly style={{ width: '100%', padding: 8, background: '#f5f5f5' }} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Amount Requested (NGN)</label><br />
          <input
            type="number"
            min="1000"
            value={amountRequested}
            onChange={(e) => setAmountRequested(e.target.value)}
            required
            style={{ width: '100%', padding: 8 }}
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Repayment Period (months)</label><br />
          <input
            type="number"
            min="1"
            value={repaymentPeriod}
            onChange={(e) => setRepaymentPeriod(e.target.value)}
            required
            style={{ width: '100%', padding: 8 }}
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Purpose</label><br />
          <textarea
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            rows={4}
            required
            style={{ width: '100%', padding: 8 }}
          />
        </div>
        <button type="submit" disabled={submitting} style={{ padding: '8px 16px' }}>
          {submitting ? 'Submitting...' : 'Submit Application'}
        </button>
      </form>
    </div>
  );
};

export default LoanApplicationPage;
