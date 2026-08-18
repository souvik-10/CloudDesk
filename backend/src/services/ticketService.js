// Temporary in-memory database
let tickets = [];

const createTicket = (ticketData) => {
    const newTicket = {
        ticketId: `TICK-${Date.now()}`,
        title: ticketData.title,
        description: ticketData.description,
        status: 'OPEN',
        priority: ticketData.priority || 'MEDIUM',
        createdAt: new Date().toISOString()
    };
    tickets.push(newTicket);
    return newTicket;
};

const getAllTickets = () => {
    return tickets;
};

// --- NEW FUNCTIONS BELOW ---

const getTicketById = (ticketId) => {
    // Find a single ticket in the array
    return tickets.find(t => t.ticketId === ticketId);
};

const updateTicket = (ticketId, updateData) => {
    const ticketIndex = tickets.findIndex(t => t.ticketId === ticketId);
    if (ticketIndex === -1) return null; // Ticket not found

    // Update only allowed fields (status, priority)
    const updatedTicket = {
        ...tickets[ticketIndex],
        status: updateData.status || tickets[ticketIndex].status,
        priority: updateData.priority || tickets[ticketIndex].priority,
        updatedAt: new Date().toISOString()
    };

    tickets[ticketIndex] = updatedTicket;
    return updatedTicket;
};

module.exports = {
    createTicket,
    getAllTickets,
    getTicketById,
    updateTicket
};
