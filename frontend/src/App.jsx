import { useState } from 'react'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

function App() {
  const [currentRoute, setCurrentRoute] = useState('login');

  const renderPage = () => {
    switch (currentRoute) {
      case 'login':
        return <Login onLogin={setCurrentRoute} />;
      case 'dashboard':
        return <Dashboard onLogout={setCurrentRoute} />;
      default:
        return <h1>404 Not Found</h1>;
    }
  };

  return (
    <div>
      <nav style={{ padding: '1rem 2rem', backgroundColor: 'var(--card-bg)', borderBottom: '1px solid var(--border)' }}>
        <h2 style={{ color: 'var(--primary)' }}>CloudDesk</h2>
      </nav>
      <main>
        {renderPage()}
      </main>
    </div>
  )
}

export default App
