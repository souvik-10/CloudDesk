const s3Service = require('../services/s3Service');
const ticketService = require('../services/ticketService');

const createTicket = async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title || !description) {
            return res.status(400).json({ success: false, message: 'Title and description are required' });
        }

        // Await the database call
        const newTicket = await ticketService.createTicket(req.body);
        res.status(201).json({ success: true, data: newTicket });
    } catch (error) {
        console.log("CRASH ERROR:", error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

const getTickets = async (req, res) => {
    try {
        const tickets = await ticketService.getAllTickets();
        res.status(200).json({ success: true, data: tickets });
    } catch (error) {
        console.log("CRASH ERROR:", error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

const getTicketById = async (req, res) => {
    try {
        const ticketId = req.params.id;
        const ticket = await ticketService.getTicketById(ticketId);

        if (!ticket) {
            return res.status(404).json({ success: false, message: 'Ticket not found', errorCode: 'TICKET_NOT_FOUND' });
        }

        res.status(200).json({ success: true, data: ticket });
    } catch (error) {
        console.log("CRASH ERROR:", error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

const updateTicket = async (req, res) => {
    try {
        const ticketId = req.params.id;
        const updatedTicket = await ticketService.updateTicket(ticketId, req.body);

        if (!updatedTicket) {
            return res.status(404).json({ success: false, message: 'Ticket not found', errorCode: 'TICKET_NOT_FOUND' });
        }

        res.status(200).json({ success: true, data: updatedTicket });
    } catch (error) {
        console.log("CRASH ERROR:", error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};


const getUploadUrl = async (req, res) => {
    try {
        const { fileName, fileType } = req.query;

        if (!fileName || !fileType) {
            return res.status(400).json({ success: false, message: 'fileName and fileType query parameters are required' });
        }
        const urlData = await s3Service.generateUploadUrl(fileName, fileType);
        res.status(200).json({ success: true, data: urlData });
    } catch (error) {
        console.log("S3 ERROR:", error);
        res.status(500).json({ success: false, message: 'Could not generate upload URL' });
    }
};

module.exports = {
    createTicket,
    getTickets,
    getTicketById,
    updateTicket,
    getUploadUrl
};
