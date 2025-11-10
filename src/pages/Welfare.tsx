import { useState } from 'react';
import { Heart, Plus } from 'lucide-react';

export default function Welfare() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    type: 'medical',
    amount: '',
    description: ''
  });

  const welfareRequests = [
    { id: '1', memberName: 'John Doe', type: 'medical', amount: 1500, description: 'Medical emergency - surgery', status: 'approved' as const, dateRequested: '2024-01-15' },
    { id: '2', memberName: 'Jane Smith', type: 'education', amount: 800, description: 'Child school fees assistance', status: 'pending' as const, dateRequested: '2024-01-20' },
    { id: '3', memberName: 'Michael Johnson', type: 'emergency', amount: 2000, description: 'Family emergency support', status: 'approved' as const, dateRequested: '2024-01-10' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Welfare request submitted successfully! The committee will review your application.');
    setShowForm(false);
    setFormData({ type: 'medical', amount: '', description: '' });
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h2>Member Welfare</h2>
          <p>Support system for our alumni community - medical, education, and emergency assistance.</p>
        </div>
        <button className="btn" onClick={() => setShowForm(!showForm)}>
          <Plus size={20} style={{ verticalAlign: 'middle', marginRight: '5px' }} />
          New Request
        </button>
      </div>

      {showForm && (
        <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
          <h3>Submit Welfare Request</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Type of Assistance</label>
              <select 
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
                required
              >
                <option value="medical">Medical</option>
                <option value="emergency">Emergency</option>
                <option value="education">Education</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Amount Requested ($)</label>
              <input 
                type="number" 
                value={formData.amount}
                onChange={(e) => setFormData({...formData, amount: e.target.value})}
                required 
                min="0"
                step="0.01"
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea 
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                required
                placeholder="Please describe your welfare need..."
              />
            </div>
            <button type="submit" className="btn">Submit Request</button>
            <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)} style={{ marginLeft: '10px' }}>
              Cancel
            </button>
          </form>
        </div>
      )}

      <div style={{ marginTop: '20px' }}>
        <h3>Recent Welfare Requests</h3>
        {welfareRequests.map(request => (
          <div key={request.id} className="list-item">
            <div style={{ display: 'flex', alignItems: 'start', gap: '10px' }}>
              <Heart size={24} color="#667eea" />
              <div style={{ flex: 1 }}>
                <h4>{request.memberName} - {request.type.charAt(0).toUpperCase() + request.type.slice(1)}</h4>
                <p>{request.description}</p>
                <p style={{ fontWeight: 'bold' }}>Amount: ${request.amount.toLocaleString()}</p>
                <p style={{ fontSize: '0.85em', color: '#999' }}>Requested: {new Date(request.dateRequested).toLocaleDateString()}</p>
                <span className={`status status-${request.status}`}>{request.status}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
