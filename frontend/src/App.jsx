import { useState } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CreateTicket from './pages/CreateTicket'; // <-- NEW

function App() {
  const [currentPage, setCurrentPage] = useState('login');

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <Login onLogin={setCurrentPage} />;
      case 'dashboard':
        return <Dashboard onLogout={setCurrentPage} onNavigate={setCurrentPage} />; // <-- Pass onNavigate
      case 'create-ticket':
        return <CreateTicket onNavigate={setCurrentPage} />; // <-- NEW
      default:
        return <Login onLogin={setCurrentPage} />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--background)' }}>
      {renderPage()}
    </div>
  );
}

export default App;
