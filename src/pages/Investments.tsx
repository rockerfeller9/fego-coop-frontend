import { TrendingUp, DollarSign } from 'lucide-react';

export default function Investments() {
  const investments = [
    {
      id: '1',
      name: 'Real Estate Development Fund',
      description: 'Investment in residential property development with guaranteed returns',
      minimumAmount: 5000,
      expectedReturn: '12-15% annually',
      duration: '24 months',
      riskLevel: 'medium' as const,
      availableShares: 50,
      status: 'open' as const
    },
    {
      id: '2',
      name: 'Agricultural Cooperative',
      description: 'Large-scale farming project focused on sustainable agriculture',
      minimumAmount: 2000,
      expectedReturn: '10-12% annually',
      duration: '18 months',
      riskLevel: 'low' as const,
      availableShares: 100,
      status: 'open' as const
    },
    {
      id: '3',
      name: 'Technology Startup Fund',
      description: 'Investment in promising tech startups with high growth potential',
      minimumAmount: 10000,
      expectedReturn: '20-25% annually',
      duration: '36 months',
      riskLevel: 'high' as const,
      availableShares: 25,
      status: 'open' as const
    },
    {
      id: '4',
      name: 'Treasury Bonds Portfolio',
      description: 'Safe government bonds with guaranteed returns',
      minimumAmount: 1000,
      expectedReturn: '6-8% annually',
      duration: '12 months',
      riskLevel: 'low' as const,
      availableShares: 200,
      status: 'open' as const
    },
  ];

  const myInvestments = [
    { id: '1', investmentName: 'Agricultural Cooperative', amount: 2000, shares: 1, dateInvested: '2023-06-15', status: 'active' },
    { id: '2', investmentName: 'Real Estate Development Fund', amount: 5000, shares: 1, dateInvested: '2023-09-01', status: 'active' },
  ];

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return '#28a745';
      case 'medium': return '#ffc107';
      case 'high': return '#dc3545';
      default: return '#667eea';
    }
  };

  return (
    <div>
      <h2>Investment Opportunities</h2>
      <p>Grow your wealth through our carefully vetted investment opportunities with competitive returns.</p>

      <div style={{ marginTop: '30px', marginBottom: '30px' }}>
        <h3>Your Active Investments</h3>
        {myInvestments.length > 0 ? (
          <div className="grid">
            {myInvestments.map(investment => (
              <div key={investment.id} className="card">
                <h4>{investment.investmentName}</h4>
                <p><strong>Amount:</strong> ${investment.amount.toLocaleString()}</p>
                <p><strong>Shares:</strong> {investment.shares}</p>
                <p><strong>Date:</strong> {new Date(investment.dateInvested).toLocaleDateString()}</p>
                <span className="status status-active">{investment.status}</span>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ fontStyle: 'italic', color: '#999' }}>You haven't made any investments yet.</p>
        )}
      </div>
      
      <h3>Available Investment Opportunities</h3>
      <div className="grid">
        {investments.map(investment => (
          <div key={investment.id} className="card">
            <h3>
              <TrendingUp size={24} />
              {investment.name}
            </h3>
            <p>{investment.description}</p>
            <div style={{ marginTop: '15px', marginBottom: '15px' }}>
              <p><strong>Minimum Investment:</strong> ${investment.minimumAmount.toLocaleString()}</p>
              <p><strong>Expected Return:</strong> {investment.expectedReturn}</p>
              <p><strong>Duration:</strong> {investment.duration}</p>
              <p><strong>Available Shares:</strong> {investment.availableShares}</p>
              <p>
                <strong>Risk Level:</strong>{' '}
                <span style={{ 
                  padding: '2px 8px', 
                  borderRadius: '4px', 
                  background: getRiskColor(investment.riskLevel), 
                  color: 'white',
                  fontSize: '0.85em',
                  fontWeight: 'bold'
                }}>
                  {investment.riskLevel.toUpperCase()}
                </span>
              </p>
            </div>
            <button className="btn">
              <DollarSign size={16} style={{ verticalAlign: 'middle', marginRight: '5px' }} />
              Invest Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
