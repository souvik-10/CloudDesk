export default function Login({ onLogin }) {
    return (
        <div style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto' }}>
            <h1>Login to CloudDesk</h1>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
                <input type="email" placeholder="Email" style={{ padding: '0.75rem', border: '1px solid var(--border)' }} />
                <input type="password" placeholder="Password" style={{ padding: '0.75rem', border: '1px solid var(--border)' }} />
                <button
                    onClick={() => onLogin('dashboard')}
                    style={{ padding: '0.75rem', backgroundColor: 'var(--primary)', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px' }}
                >
                    Login
                </button>
            </div>
        </div>
    );
}
