import { Users, TrendingUp, Wallet, Heart } from 'lucide-react';

interface DashboardProps {
  user: { name: string };
}

export default function Dashboard({ user }: DashboardProps) {
  return (
    <div>
      <h2>Welcome, {user.name}!</h2>
      <p>Your cooperative dashboard - managing welfare, investments, and loans for our alumni community.</p>
      
      <div className="grid">
        <div className="card">
          <h3><Users size={24} /> Total Members</h3>
          <p style={{ fontSize: '2em', fontWeight: 'bold', color: '#667eea' }}>247</p>
          <p>Active members in the cooperative</p>
        </div>
        
        <div className="card">
          <h3><Heart size={24} /> Welfare Fund</h3>
          <p style={{ fontSize: '2em', fontWeight: 'bold', color: '#667eea' }}>$125,450</p>
          <p>Available for member support</p>
        </div>
        
        <div className="card">
          <h3><TrendingUp size={24} /> Active Investments</h3>
          <p style={{ fontSize: '2em', fontWeight: 'bold', color: '#667eea' }}>12</p>
          <p>Investment opportunities available</p>
        </div>
        
        <div className="card">
          <h3><Wallet size={24} /> Loans Disbursed</h3>
          <p style={{ fontSize: '2em', fontWeight: 'bold', color: '#667eea' }}>$450,000</p>
          <p>Total loans to members this year</p>
        </div>
      </div>

      <div style={{ marginTop: '30px' }}>
        <h3>Quick Stats</h3>
        <div className="grid">
          <div className="list-item">
            <h4>Your Contributions</h4>
            <p>Monthly: $50 | Total: $2,400</p>
          </div>
          <div className="list-item">
            <h4>Your Investments</h4>
            <p>3 Active investments totaling $5,000</p>
          </div>
          <div className="list-item">
            <h4>Your Loans</h4>
            <p>1 Active loan - $3,000 remaining</p>
          </div>
        </div>
      </div>
    </div>
  );
}
