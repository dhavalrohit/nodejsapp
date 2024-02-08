
const http = require('http');
const WebSocket = require('ws');

// Create an HTTP server
const httpServer = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('HTTP Server is running');
});

// Create a WebSocket server
const wss = new WebSocket.Server({ server: httpServer });

// Array to store connected clients
const clients = [];

wss.on('connection', (socket) => {
    console.log('A new WebSocket client connected!');

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
        console.log('WebSocket client disconnected');
    });
});

// Function to broadcast messages to all connected clients
function broadcast(message) {
    clients.forEach((client) => {
        client.send(message);
    });
}


// Start the HTTP server listening on port 9999
const PORT = process.env.PORT || 9999;
httpServer.listen(PORT, () => {
    console.log(`HTTP Server is running on port ${PORT}`);
});
