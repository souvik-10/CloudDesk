const ticketRepository = require('../repositories/ticketRepository');

const createTicket = async (ticketData) => {
    const newTicket = {
        ticketId: `TICK-${Date.now()}`,
        title: ticketData.title,
        description: ticketData.description,
        status: 'OPEN',
        priority: ticketData.priority || 'MEDIUM',
        attachmentUrl: ticketData.attachmentUrl || null,


        createdAt: new Date().toISOString()
    };

    // Save to AWS DynamoDB!
    await ticketRepository.saveTicket(newTicket);
    return newTicket;
};


const getAllTickets = async () => {
    return await ticketRepository.fetchAllTickets();
};

const getTicketById = async (ticketId) => {
    return await ticketRepository.fetchTicketById(ticketId);
};

const updateTicket = async (ticketId, updateData) => {
    return await ticketRepository.updateTicketStatus(ticketId, updateData);
};

module.exports = {
    createTicket,
    getAllTickets,
    getTicketById,
    updateTicket
};
