import { useState } from 'react';

export default function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        setError(''); // clear previous errors
        try {
            // Talk to our backend!
            const response = await fetch('https://xc94sskd0j.execute-api.eu-north-1.amazonaws.com/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (data.success) {
                // Save the JWT passport in the browser!
                localStorage.setItem('clouddesk_token', data.token);
                onLogin('dashboard');
            } else {
                setError(data.message); // Show "Invalid username or password"
            }
        } catch (err) {
            setError('Failed to connect to server');
        }
    };

    return (
        <div style={{ padding: '2rem', maxWidth: '450px', margin: '0 auto', marginTop: '12vh' }}>
            <div className="card">
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h1 style={{ color: 'var(--primary)', fontSize: '2rem', fontWeight: '700', letterSpacing: '-0.025em' }}>CloudDesk</h1>
                    <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Welcome back. Please sign in to your account.</p>
                </div>
                
                {error && <div style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA', color: 'var(--danger)', padding: '0.75rem', borderRadius: 'var(--radius)', marginBottom: '1.5rem', textAlign: 'center', fontSize: '0.9rem', fontWeight: '500' }}>{error}</div>}
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--text-main)' }}>Username</label>
                        <input 
                            type="text" 
                            placeholder="Enter your username" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--text-main)' }}>Password</label>
                        <input 
                            type="password" 
                            placeholder="••••••••" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button className="btn-primary" onClick={handleLogin} style={{ marginTop: '0.5rem', width: '100%' }}>
                        Secure Login
                    </button>
                </div>
            </div>
        </div>
    );
}
