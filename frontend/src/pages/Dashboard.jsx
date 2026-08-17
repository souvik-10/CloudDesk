export default function Dashboard({ onLogout }) {
    return (
        <div style={{ padding: '2rem' }}>
            <h1>Support Dashboard</h1>
            <p style={{ marginTop: '1rem' }}>Welcome! Here are your tickets.</p>

            {/* Placeholder for the ticket list */}
            <div style={{ marginTop: '2rem', padding: '1.5rem', border: '1px solid var(--border)', backgroundColor: 'var(--card-bg)', borderRadius: '4px' }}>
                No tickets found.
            </div>

            <button
                onClick={() => onLogout('login')}
                style={{ marginTop: '2rem', padding: '0.5rem 1rem', cursor: 'pointer' }}
            >
                Logout
            </button>
        </div>
    );
}
