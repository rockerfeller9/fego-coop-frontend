import { UserCircle } from 'lucide-react';

export default function Members() {
  const members = [
    { id: '1', name: 'John Doe', membershipNumber: 'MEM001', graduationYear: 2015, status: 'active', contributions: 2400 },
    { id: '2', name: 'Jane Smith', membershipNumber: 'MEM002', graduationYear: 2016, status: 'active', contributions: 1800 },
    { id: '3', name: 'Michael Johnson', membershipNumber: 'MEM003', graduationYear: 2014, status: 'active', contributions: 3600 },
    { id: '4', name: 'Sarah Williams', membershipNumber: 'MEM004', graduationYear: 2017, status: 'active', contributions: 1200 },
  ];

  return (
    <div>
      <h2>Member Directory</h2>
      <p>View and manage all cooperative members from our High School Alumni community.</p>
      
      <div style={{ marginTop: '20px' }}>
        {members.map(member => (
          <div key={member.id} className="list-item">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <UserCircle size={32} color="#667eea" />
              <div>
                <h4>{member.name}</h4>
                <p style={{ margin: 0 }}>Membership: {member.membershipNumber} | Class of {member.graduationYear}</p>
              </div>
            </div>
            <p>Total Contributions: ${member.contributions.toLocaleString()}</p>
            <span className="status status-active">{member.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
