const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, PutCommand, GetCommand, ScanCommand, UpdateCommand } = require('@aws-sdk/lib-dynamodb');

// Initialize the DynamoDB Client. It will automatically use the credentials from your .env file!
const client = new DynamoDBClient({
    region: process.env.AWS_REGION
});

const docClient = DynamoDBDocumentClient.from(client);
const TABLE_NAME = 'CloudDeskTickets';

const saveTicket = async (ticket) => {
    const command = new PutCommand({
        TableName: TABLE_NAME,
        Item: ticket
    });
    await docClient.send(command);
    return ticket;
};

const fetchAllTickets = async () => {
    const command = new ScanCommand({
        TableName: TABLE_NAME
    });
    const response = await docClient.send(command);
    return response.Items || [];
};

const fetchTicketById = async (ticketId) => {
    const command = new GetCommand({
        TableName: TABLE_NAME,
        Key: { ticketId } // Lookup using our Partition Key
    });
    const response = await docClient.send(command);
    return response.Item || null;
};

const updateTicketStatus = async (ticketId, updateData) => {
    const command = new UpdateCommand({
        TableName: TABLE_NAME,
        Key: { ticketId },
        // Define what fields we want to update
        UpdateExpression: 'set #status = :status, priority = :priority, updatedAt = :updatedAt',
        ExpressionAttributeNames: {
            '#status': 'status' // 'status' is a reserved word in AWS, so we use a # alias
        },
        ExpressionAttributeValues: {
            ':status': updateData.status,
            ':priority': updateData.priority,
            ':updatedAt': new Date().toISOString()
        },
        ReturnValues: 'ALL_NEW' // Ask AWS to return the newly updated ticket
    });

    try {
        const response = await docClient.send(command);
        return response.Attributes;
    } catch (error) {
        return null;
    }
};

module.exports = {
    saveTicket,
    fetchAllTickets,
    fetchTicketById,
    updateTicketStatus
};
