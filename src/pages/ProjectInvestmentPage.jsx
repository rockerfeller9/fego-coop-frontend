// src/pages/ProjectInvestmentPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProjectInvestmentPage = () => {
  const [projects, setProjects] = useState([]);
  const [investAmount, setInvestAmount] = useState({});
  const [message, setMessage] = useState('');
  const [loadingId, setLoadingId] = useState(null);
  const token = localStorage.getItem('fegoToken');

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/projects', {
          headers: { 'x-auth-token': token }
        });
        setProjects(res.data || []);
      } catch (e) {
        setMessage('Failed to load projects');
      }
    })();
  }, [token]);

  const handleInvest = async (projectId) => {
    const amt = Number(investAmount[projectId]);
    if (!amt || amt <= 0) { setMessage('Enter a valid amount'); return; }
    setLoadingId(projectId);
    try {
      const res = await axios.post(
        'http://localhost:5000/api/projects/invest',
        { projectId, amount: amt },
        { headers: { 'x-auth-token': token, 'Content-Type': 'application/json' } }
      );
      setMessage(res.data.msg || 'Investment successful');
      const refreshed = await axios.get('http://localhost:5000/api/projects', {
        headers: { 'x-auth-token': token }
      });
      setProjects(refreshed.data || []);
      setInvestAmount(p => ({ ...p, [projectId]: '' }));
    } catch (e) {
      setMessage(e.response?.data?.msg || 'Investment failed');
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div style={{ maxWidth: 760, margin: '20px auto' }}>
      <h2>Invest in Projects</h2>
      {message && <p>{message}</p>}
      {projects.length === 0 && <p>No open projects.</p>}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {projects.map(p => {
          const percent = p.targetAmount ? ((p.currentRaised / p.targetAmount) * 100).toFixed(1) : 0;
          return (
            <li key={p._id} style={{ border: '1px solid #ddd', padding: 15, marginBottom: 12 }}>
              <strong>{p.name}</strong>
              <p>{p.description}</p>
              <p>Target: NGN {p.targetAmount} | Raised: NGN {p.currentRaised} ({percent}%) | Status: {p.status}</p>
              <div>
                <input
                  type="number"
                  min="1"
                  placeholder="Amount (NGN)"
                  value={investAmount[p._id] || ''}
                  onChange={e => setInvestAmount(prev => ({ ...prev, [p._id]: e.target.value }))}
                  style={{ width: 160, marginRight: 8 }}
                />
                <button onClick={() => handleInvest(p._id)} disabled={loadingId === p._id}>
                  {loadingId === p._id ? 'Processing...' : 'Invest'}
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ProjectInvestmentPage;
