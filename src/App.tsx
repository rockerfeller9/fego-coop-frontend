import { useState } from 'react';
import { Home, Users, Heart, TrendingUp, Wallet, LogOut } from 'lucide-react';
import './App.css';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Members from './pages/Members';
import Welfare from './pages/Welfare';
import Investments from './pages/Investments';
import Loans from './pages/Loans';

type Page = 'dashboard' | 'members' | 'welfare' | 'investments' | 'loans';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string } | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');

  const handleLogin = (user: { name: string; email: string }) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    setCurrentPage('dashboard');
  };

  if (!isAuthenticated) {
    return <Auth onLogin={handleLogin} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard user={currentUser!} />;
      case 'members':
        return <Members />;
      case 'welfare':
        return <Welfare />;
      case 'investments':
        return <Investments />;
      case 'loans':
        return <Loans />;
      default:
        return <Dashboard user={currentUser!} />;
    }
  };

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>🎓 FEGO Alumni Cooperative</h1>
          <p>High School Alumni Multipurpose Cooperative Society</p>
          <p style={{ fontSize: '0.9em', marginTop: '5px' }}>
            Logged in as: <strong>{currentUser?.name}</strong> ({currentUser?.email})
          </p>
          
          <nav className="nav">
            <button 
              className={currentPage === 'dashboard' ? 'active' : ''} 
              onClick={() => setCurrentPage('dashboard')}
            >
              <Home size={18} style={{ verticalAlign: 'middle', marginRight: '5px' }} />
              Dashboard
            </button>
            <button 
              className={currentPage === 'members' ? 'active' : ''} 
              onClick={() => setCurrentPage('members')}
            >
              <Users size={18} style={{ verticalAlign: 'middle', marginRight: '5px' }} />
              Members
            </button>
            <button 
              className={currentPage === 'welfare' ? 'active' : ''} 
              onClick={() => setCurrentPage('welfare')}
            >
              <Heart size={18} style={{ verticalAlign: 'middle', marginRight: '5px' }} />
              Welfare
            </button>
            <button 
              className={currentPage === 'investments' ? 'active' : ''} 
              onClick={() => setCurrentPage('investments')}
            >
              <TrendingUp size={18} style={{ verticalAlign: 'middle', marginRight: '5px' }} />
              Investments
            </button>
            <button 
              className={currentPage === 'loans' ? 'active' : ''} 
              onClick={() => setCurrentPage('loans')}
            >
              <Wallet size={18} style={{ verticalAlign: 'middle', marginRight: '5px' }} />
              Loans
            </button>
            <button onClick={handleLogout} style={{ marginLeft: 'auto' }}>
              <LogOut size={18} style={{ verticalAlign: 'middle', marginRight: '5px' }} />
              Logout
            </button>
          </nav>
        </header>

        <main className="content">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default App;
