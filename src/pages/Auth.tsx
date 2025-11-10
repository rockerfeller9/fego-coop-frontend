import { useState } from 'react';
import { LogIn } from 'lucide-react';

interface AuthProps {
  onLogin: (user: { name: string; email: string }) => void;
}

export default function Auth({ onLogin }: AuthProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    membershipNumber: '',
    graduationYear: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock authentication - in real app, this would call an API
    onLogin({
      name: formData.name || 'Demo User',
      email: formData.email
    });
  };

  return (
    <div className="app">
      <div className="container">
        <div className="auth-container">
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <LogIn size={48} color="#667eea" />
            <h2>{isLogin ? 'Welcome Back' : 'Join Our Cooperative'}</h2>
            <p style={{ color: '#666' }}>
              {isLogin 
                ? 'Sign in to access your cooperative account' 
                : 'Register to become a member of our alumni cooperative'}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="form-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required={!isLogin}
                  placeholder="John Doe"
                />
              </div>
            )}

            <div className="form-group">
              <label>Email</label>
              <input 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
                placeholder="your.email@example.com"
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input 
                type="password" 
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
                placeholder="••••••••"
              />
            </div>

            {!isLogin && (
              <>
                <div className="form-group">
                  <label>Membership Number (if alumni)</label>
                  <input 
                    type="text" 
                    value={formData.membershipNumber}
                    onChange={(e) => setFormData({...formData, membershipNumber: e.target.value})}
                    placeholder="Optional - for existing alumni"
                  />
                </div>

                <div className="form-group">
                  <label>Graduation Year</label>
                  <input 
                    type="number" 
                    value={formData.graduationYear}
                    onChange={(e) => setFormData({...formData, graduationYear: e.target.value})}
                    required={!isLogin}
                    min="1950"
                    max={new Date().getFullYear()}
                    placeholder="2020"
                  />
                </div>
              </>
            )}

            <button type="submit" className="btn" style={{ width: '100%', marginTop: '20px' }}>
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div className="auth-toggle">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Register' : 'Sign In'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
