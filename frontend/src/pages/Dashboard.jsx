import { useState, useEffect } from 'react';

export default function Dashboard({ onLogout, onNavigate }) {
    const [tickets, setTickets] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        // This runs automatically when the Dashboard loads
        fetchTickets();
    }, []);

    const fetchTickets = async () => {
        try {
            // Get our digital passport from the browser storage
            const token = localStorage.getItem('clouddesk_token');

            if (!token) {
                handleLogout(); // Kick them out if no token is found!
                return;
            }

            // Talk to our backend and show the passport
            const response = await fetch('https://xc94sskd0j.execute-api.eu-north-1.amazonaws.com/api/tickets', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Show the passport to the bouncer!
                }
            });

            const data = await response.json();

            if (data.success) {
                setTickets(data.data);
            } else {
                setError('Failed to load tickets. ' + data.message);
            }
        } catch (err) {
            setError('Could not connect to server.');
        }
    };

    const handleLogout = () => {
        // Destroy the passport and go back to login
        localStorage.removeItem('clouddesk_token');
        onLogout('login');
    };

    return (
        <div style={{ padding: '2rem', maxWidth: '850px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                <h1 style={{ color: 'var(--text-main)', fontSize: '2rem', fontWeight: '700', letterSpacing: '-0.025em' }}>Support Dashboard</h1>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="btn-primary" onClick={() => onNavigate('create-ticket')}>
                        + Create Ticket
                    </button>
                    <button className="btn-danger" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>

            {error && <div style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA', color: 'var(--danger)', padding: '0.75rem', borderRadius: 'var(--radius)', marginBottom: '1.5rem', fontWeight: '500' }}>{error}</div>}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {tickets.length === 0 ? (
                    <div className="card" style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                        <p>No tickets found in the AWS Database.</p>
                    </div>
                ) : (
                    tickets.map((ticket) => (
                        <div key={ticket.ticketId} className="ticket-card">
                            <div>
                                <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-main)', fontSize: '1.125rem' }}>{ticket.title}</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>{ticket.description}</p>
                                <p style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#9CA3AF', fontFamily: 'monospace' }}>ID: {ticket.ticketId}</p>
                                
                                {/* If the ticket has an attachment, show a link to view it! */}
                                {ticket.attachmentUrl && (
                                    <p style={{ marginTop: '0.75rem' }}>
                                        <a href={ticket.attachmentUrl} target="_blank" rel="noreferrer" style={{ color: 'var(--primary)', textDecoration: 'none', fontSize: '0.85rem', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                                            📎 View Attachment
                                        </a>
                                    </p>
                                )}
                            </div>
                            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                                <span className={`badge ${ticket.status.toLowerCase()}`}>
                                    {ticket.status}
                                </span>
                                <span className={`badge ${ticket.priority.toLowerCase()}`}>
                                    {ticket.priority}
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
