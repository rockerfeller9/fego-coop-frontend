import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FinancialHistoryPage = () => {
    const [history, setHistory] = useState({ contributions: [], loans: [] });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHistory = async () => {
            const token = localStorage.getItem('fegoToken');
            if (!token) return;
            try {
                const config = { headers: { 'x-auth-token': token } };
                const res = await axios.get('http://localhost:5000/api/users/financial-history', config);
                setHistory(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Could not fetch financial history:", err);
                setLoading(false);
            }
        };
        fetchHistory();
    }, []);

    if (loading) return <h2>Loading Financial History...</h2>;

    return (
        <div style={{ maxWidth: 900, margin: '30px auto' }}>
            <h2>Detailed Financial History</h2>
            <button onClick={() => navigate('/dashboard')} style={{ marginBottom: '20px' }}>Back to Dashboard</button>

            <h3>Contribution History</h3>
            {history.contributions.length === 0 ? (
                <p>No contributions recorded yet.</p>
            ) : (
                <table border="1" width="100%" cellPadding="5" style={{ borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Amount (NGN)</th>
                            <th>Transaction Reference</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.contributions.map(c => (
                            <tr key={c.transactionRef}>
                                <td>{new Date(c.createdAt).toLocaleDateString()}</td>
                                <td>{c.amount.toFixed(2)}</td>
                                <td>{c.transactionRef}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <h3 style={{ marginTop: 30 }}>Loan Application History</h3>
            {history.loans.length === 0 ? (
                <p>No loan applications recorded yet.</p>
            ) : (
                <table border="1" width="100%" cellPadding="5" style={{ borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th>Date Applied</th>
                            <th>Amount Requested (NGN)</th>
                            <th>Purpose</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.loans.map(l => (
                            <tr key={l._id}>
                                <td>{new Date(l.createdAt).toLocaleDateString()}</td>
                                <td>{l.amountRequested.toFixed(2)}</td>
                                <td>{l.purpose}</td>
                                <td>{l.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default FinancialHistoryPage;