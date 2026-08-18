const ticketService = require('../services/ticketService');

const createTicket = (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title || !description) {
            return res.status(400).json({ success: false, message: 'Title and description are required' });
        }
        const newTicket = ticketService.createTicket(req.body);
        res.status(201).json({ success: true, data: newTicket });
    } catch (error) {
        console.log("CRASH ERROR:", error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

const getTickets = (req, res) => {
    try {
        const tickets = ticketService.getAllTickets();
        res.status(200).json({ success: true, data: tickets });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// --- NEW CONTROLLERS BELOW ---

const getTicketById = (req, res) => {
    try {
        const ticketId = req.params.id; // Extract the ID from the URL
        const ticket = ticketService.getTicketById(ticketId);

        if (!ticket) {
            // 404 means Not Found!
            return res.status(404).json({ success: false, message: 'Ticket not found', errorCode: 'TICKET_NOT_FOUND' });
        }

        res.status(200).json({ success: true, data: ticket });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

const updateTicket = (req, res) => {
    try {
        const ticketId = req.params.id;
        const updatedTicket = ticketService.updateTicket(ticketId, req.body);

        if (!updatedTicket) {
            return res.status(404).json({ success: false, message: 'Ticket not found', errorCode: 'TICKET_NOT_FOUND' });
        }

        res.status(200).json({ success: true, data: updatedTicket });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

module.exports = {
    createTicket,
    getTickets,
    getTicketById,
    updateTicket
};
