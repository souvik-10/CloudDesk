import { useState } from 'react';

export default function CreateTicket({ onNavigate }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('MEDIUM');
    const [file, setFile] = useState(null);
    const [statusMessage, setStatusMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatusMessage('Starting upload...');

        try {
            const token = localStorage.getItem('clouddesk_token');
            let finalAttachmentUrl = null;

            // STEP 1: If user selected a file, ask our backend for an AWS S3 Pre-Signed URL
            if (file) {
                setStatusMessage('Generating secure AWS link...');
                const urlResponse = await fetch(`https://xc94sskd0j.execute-api.eu-north-1.amazonaws.com/api/tickets/upload-url?fileName=${file.name}&fileType=${file.type}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                const urlData = await urlResponse.json();

                if (urlData.success) {
                    setStatusMessage('Uploading file directly to AWS S3...');
                    // STEP 2: Upload the heavy file DIRECTLY to AWS S3 (Bypassing our Node server!)
                    await fetch(urlData.data.uploadUrl, {
                        method: 'PUT',
                        body: file,
                        headers: { 'Content-Type': file.type }
                    });

                    finalAttachmentUrl = urlData.data.fileUrl; // Save the final public URL
                }
            }

            // STEP 3: Create the actual ticket in DynamoDB
            setStatusMessage('Saving ticket to database...');
            const ticketResponse = await fetch('https://xc94sskd0j.execute-api.eu-north-1.amazonaws.com/api/tickets', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    title,
                    description,
                    priority,
                    attachmentUrl: finalAttachmentUrl // Link the S3 image to the DynamoDB ticket!
                })
            });

            if (ticketResponse.ok) {
                onNavigate('dashboard'); // Go back to dashboard on success!
            } else {
                setStatusMessage('Failed to create ticket.');
            }
        } catch (error) {
            setStatusMessage('An error occurred during submission.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div style={{ padding: '2rem', maxWidth: '650px', margin: '0 auto' }}>
            <button 
                onClick={() => onNavigate('dashboard')} 
                style={{ marginBottom: '1.5rem', cursor: 'pointer', padding: '0.5rem 0', background: 'transparent', border: 'none', color: 'var(--text-muted)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'color 0.2s ease' }}
                onMouseOver={(e) => e.target.style.color = 'var(--text-main)'}
                onMouseOut={(e) => e.target.style.color = 'var(--text-muted)'}
            >
                ← Back to Dashboard
            </button>
            
            <div className="card">
                <div style={{ marginBottom: '2rem' }}>
                    <h1 style={{ color: 'var(--text-main)', fontSize: '1.75rem', fontWeight: '700', letterSpacing: '-0.025em' }}>Create New Ticket</h1>
                    <p style={{ color: 'var(--text-muted)', marginTop: '0.25rem', fontSize: '0.95rem' }}>Describe your issue in detail and we'll help you resolve it.</p>
                </div>
                
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--text-main)' }}>Ticket Title</label>
                        <input 
                            type="text" 
                            placeholder="e.g. Cannot connect to the database" 
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    
                    <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--text-main)' }}>Description</label>
                        <textarea 
                            placeholder="Please provide as much detail as possible..." 
                            required
                            rows="5"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            style={{ resize: 'vertical' }}
                        />
                    </div>
                    
                    <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--text-main)' }}>Priority Level</label>
                        <select 
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                        >
                            <option value="LOW">Low - No immediate action required</option>
                            <option value="MEDIUM">Medium - Normal issue</option>
                            <option value="HIGH">High - Critical system failure</option>
                        </select>
                    </div>

                    <div style={{ padding: '1.5rem', border: '2px dashed var(--border)', borderRadius: 'var(--radius)', backgroundColor: '#F8FAFC', marginTop: '0.5rem' }}>
                        <p style={{ marginBottom: '0.75rem', fontWeight: '600', color: 'var(--text-main)', fontSize: '0.95rem' }}>Attach Screenshot (Optional)</p>
                        <input 
                            type="file" 
                            accept="image/*"
                            onChange={(e) => setFile(e.target.files[0])}
                            style={{ border: 'none', background: 'transparent', padding: '0', boxShadow: 'none' }}
                        />
                    </div>
                    
                    {statusMessage && (
                        <div style={{ padding: '1rem', backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: 'var(--radius)', color: '#1E40AF', fontWeight: '500', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <svg style={{ width: '1.25rem', height: '1.25rem', animation: 'spin 1s linear infinite' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                            {statusMessage}
                        </div>
                    )}

                    <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="btn-primary"
                        style={{ marginTop: '1rem', height: '3rem' }}
                    >
                        {isSubmitting ? 'Processing...' : 'Submit Ticket'}
                    </button>
                </form>
            </div>
        </div>
    );
}
