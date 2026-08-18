require('dotenv').config();

const express = require('express');
const ticketRoutes = require('./routes/ticketRoutes'); // <-- NEW
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(express.json());

app.get('/api/health', (req, res) => {
    res.status(200).json({ success: true, message: 'CloudDesk API is running!' });
});

// Connect our ticket routes to the /api/tickets URL prefix 
app.use('/api/auth', authRoutes);
app.use('/api/tickets', ticketRoutes);

app.use((req, res) => {
    res.status(404).json({ success: false, message: 'API route not found' });
});

const PORT = process.env.PORT || 3000;
if (require.main === module) {
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}

module.exports = app;
