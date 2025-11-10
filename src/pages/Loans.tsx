import { useState } from 'react';
import { Wallet, Plus, Calculator } from 'lucide-react';

export default function Loans() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    amount: '',
    duration: '12',
    purpose: '',
    employmentStatus: '',
    monthlyIncome: '',
    guarantor1Name: '',
    guarantor1Contact: '',
    guarantor2Name: '',
    guarantor2Contact: ''
  });

  const loans = [
    {
      id: '1',
      memberName: 'John Doe',
      amount: 5000,
      interestRate: 5,
      duration: 12,
      purpose: 'Small business startup',
      status: 'active' as const,
      applicationDate: '2023-09-01',
      monthlyPayment: 428,
      amountPaid: 1284,
      balance: 3716
    },
    {
      id: '2',
      memberName: 'Jane Smith',
      amount: 3000,
      interestRate: 5,
      duration: 6,
      purpose: 'Emergency home repairs',
      status: 'pending' as const,
      applicationDate: '2024-01-15'
    },
    {
      id: '3',
      memberName: 'Michael Johnson',
      amount: 10000,
      interestRate: 5,
      duration: 24,
      purpose: 'Vehicle purchase',
      status: 'approved' as const,
      applicationDate: '2024-01-10'
    },
  ];

  const calculateMonthlyPayment = (amount: number, rate: number, months: number) => {
    const monthlyRate = rate / 100 / 12;
    const payment = (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    return payment.toFixed(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Loan application submitted successfully! The committee will review and get back to you within 5 business days.');
    setShowForm(false);
    setFormData({
      amount: '',
      duration: '12',
      purpose: '',
      employmentStatus: '',
      monthlyIncome: '',
      guarantor1Name: '',
      guarantor1Contact: '',
      guarantor2Name: '',
      guarantor2Contact: ''
    });
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h2>Low Interest Loans</h2>
          <p>Access affordable loans at 5% annual interest rate - supporting our alumni community.</p>
        </div>
        <button className="btn" onClick={() => setShowForm(!showForm)}>
          <Plus size={20} style={{ verticalAlign: 'middle', marginRight: '5px' }} />
          Apply for Loan
        </button>
      </div>

      <div className="grid" style={{ marginBottom: '30px' }}>
        <div className="card">
          <h3><Calculator size={24} /> Loan Calculator</h3>
          <p><strong>Interest Rate:</strong> 5% per annum</p>
          <p><strong>Maximum Amount:</strong> $25,000</p>
          <p><strong>Maximum Duration:</strong> 36 months</p>
          <p style={{ fontSize: '0.9em', color: '#666' }}>
            Example: $5,000 for 12 months = ${calculateMonthlyPayment(5000, 5, 12)}/month
          </p>
        </div>
        
        <div className="card">
          <h3>Eligibility Requirements</h3>
          <ul style={{ paddingLeft: '20px', color: '#666' }}>
            <li>Active member for at least 6 months</li>
            <li>Regular contributions up to date</li>
            <li>Two guarantors (members)</li>
            <li>Proof of income</li>
          </ul>
        </div>
      </div>

      {showForm && (
        <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
          <h3>Loan Application Form</h3>
          <form onSubmit={handleSubmit}>
            <div className="grid">
              <div className="form-group">
                <label>Loan Amount ($)</label>
                <input 
                  type="number" 
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  required 
                  min="100"
                  max="25000"
                  step="100"
                />
              </div>
              <div className="form-group">
                <label>Duration (months)</label>
                <select 
                  value={formData.duration}
                  onChange={(e) => setFormData({...formData, duration: e.target.value})}
                  required
                >
                  <option value="6">6 months</option>
                  <option value="12">12 months</option>
                  <option value="18">18 months</option>
                  <option value="24">24 months</option>
                  <option value="36">36 months</option>
                </select>
              </div>
            </div>

            {formData.amount && formData.duration && (
              <div style={{ background: '#e7f3ff', padding: '15px', borderRadius: '5px', marginBottom: '15px' }}>
                <strong>Estimated Monthly Payment: ${calculateMonthlyPayment(Number(formData.amount), 5, Number(formData.duration))}</strong>
              </div>
            )}

            <div className="form-group">
              <label>Purpose of Loan</label>
              <textarea 
                value={formData.purpose}
                onChange={(e) => setFormData({...formData, purpose: e.target.value})}
                required
                placeholder="Please describe the purpose of this loan..."
              />
            </div>

            <div className="grid">
              <div className="form-group">
                <label>Employment Status</label>
                <select 
                  value={formData.employmentStatus}
                  onChange={(e) => setFormData({...formData, employmentStatus: e.target.value})}
                  required
                >
                  <option value="">Select...</option>
                  <option value="employed">Employed</option>
                  <option value="self-employed">Self-Employed</option>
                  <option value="business-owner">Business Owner</option>
                </select>
              </div>
              <div className="form-group">
                <label>Monthly Income ($)</label>
                <input 
                  type="number" 
                  value={formData.monthlyIncome}
                  onChange={(e) => setFormData({...formData, monthlyIncome: e.target.value})}
                  required 
                  min="0"
                  step="100"
                />
              </div>
            </div>

            <h4 style={{ marginTop: '20px', marginBottom: '10px' }}>Guarantor Information</h4>
            <div className="grid">
              <div className="form-group">
                <label>Guarantor 1 Name</label>
                <input 
                  type="text" 
                  value={formData.guarantor1Name}
                  onChange={(e) => setFormData({...formData, guarantor1Name: e.target.value})}
                  required 
                />
              </div>
              <div className="form-group">
                <label>Guarantor 1 Contact</label>
                <input 
                  type="text" 
                  value={formData.guarantor1Contact}
                  onChange={(e) => setFormData({...formData, guarantor1Contact: e.target.value})}
                  required 
                />
              </div>
            </div>

            <div className="grid">
              <div className="form-group">
                <label>Guarantor 2 Name</label>
                <input 
                  type="text" 
                  value={formData.guarantor2Name}
                  onChange={(e) => setFormData({...formData, guarantor2Name: e.target.value})}
                  required 
                />
              </div>
              <div className="form-group">
                <label>Guarantor 2 Contact</label>
                <input 
                  type="text" 
                  value={formData.guarantor2Contact}
                  onChange={(e) => setFormData({...formData, guarantor2Contact: e.target.value})}
                  required 
                />
              </div>
            </div>

            <button type="submit" className="btn">Submit Application</button>
            <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)} style={{ marginLeft: '10px' }}>
              Cancel
            </button>
          </form>
        </div>
      )}

      <div style={{ marginTop: '20px' }}>
        <h3>Recent Loan Applications</h3>
        {loans.map(loan => (
          <div key={loan.id} className="list-item">
            <div style={{ display: 'flex', alignItems: 'start', gap: '10px' }}>
              <Wallet size={24} color="#667eea" />
              <div style={{ flex: 1 }}>
                <h4>{loan.memberName}</h4>
                <p><strong>Amount:</strong> ${loan.amount.toLocaleString()} | <strong>Duration:</strong> {loan.duration} months | <strong>Interest:</strong> {loan.interestRate}%</p>
                <p><strong>Purpose:</strong> {loan.purpose}</p>
                {loan.status === 'active' && (
                  <>
                    <p><strong>Monthly Payment:</strong> ${loan.monthlyPayment}</p>
                    <p><strong>Paid:</strong> ${loan.amountPaid?.toLocaleString()} | <strong>Balance:</strong> ${loan.balance?.toLocaleString()}</p>
                  </>
                )}
                <p style={{ fontSize: '0.85em', color: '#999' }}>Applied: {new Date(loan.applicationDate).toLocaleDateString()}</p>
                <span className={`status status-${loan.status}`}>{loan.status}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
