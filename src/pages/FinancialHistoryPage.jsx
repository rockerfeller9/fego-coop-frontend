import React, { useState, useEffect } from 'react';
import { http } from '../lib/http';

const FinancialHistoryPage = () => {
    const [history, setHistory] = useState({ contributions: [], loans: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('fegoToken');
        if (!token) return setLoading(false);
        // Placeholder: fetch your real history endpoints if available
        setLoading(false);
    }, []);

    if (loading) return <h3>Loading history…</h3>;

    return (
        <div style={{ maxWidth: 800, margin: '20px auto' }}>
            <h2>Financial History</h2>
            <p>Contributions: {history.contributions.length}</p>
            <p>Loans: {history.loans.length}</p>
            <p>(Details coming soon)</p>
        </div>
    );
};

export default FinancialHistoryPage;