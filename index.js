const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 9999 });

// Array to store connected clients
const clients = [];

server.on('connection', (socket) => {
    console.log('A new client connected!');
	
    // Add the new client to the array
    clients.push(socket);

    // Send a welcome message to the new client
    socket.send('Welcome to the WebSocket server!');

    // Handle messages from clients
    socket.on('message', (message) => {
        console.log(`Received message: ${message}`);
        // Send a response back to the client
        socket.send('Message received: ' + message);

        // Broadcast the message to all connected clients
        broadcast('Message From Client: ' + message);
    });

    // Handle disconnection
    socket.on('close', () => {
        console.log('Client disconnected');
        // Remove the disconnected client from the array
        clients.splice(clients.indexOf(socket), 1);
    });
});

// Function to broadcast messages to all connected clients
function broadcast(message) {
    clients.forEach((client) => {
        client.send(message);
    });
}
