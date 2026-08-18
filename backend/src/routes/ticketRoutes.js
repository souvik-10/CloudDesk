const express = require('express');
const ticketController = require('../controllers/ticketController');

const router = express.Router();

router.post('/', ticketController.createTicket);
router.get('/', ticketController.getTickets);

// --- NEW ROUTES BELOW ---

router.get('/upload-url', ticketController.getUploadUrl);
// The ":id" tells Express this is a dynamic URL parameter
router.get('/:id', ticketController.getTicketById);
router.put('/:id', ticketController.updateTicket);

module.exports = router;
