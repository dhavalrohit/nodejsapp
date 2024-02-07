const http = require('http');
const WebSocket = require('ws');

// Create an HTTP server
const httpServer = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('HTTP Server is running');
});

// Create a WebSocket server
const wss = new WebSocket.Server({ server: httpServer });

wss.on('connection', (socket) => {
    console.log('A new WebSocket client connected!');
    
    // Handle messages from WebSocket clients
    socket.on('message', (message) => {
        console.log(`Received message from WebSocket client: ${message}`);
        // Echo the message back to the client
        socket.send('Echo from WebSocket server: ' + message);
    });

    // Handle disconnection
    socket.on('close', () => {
        console.log('WebSocket client disconnected');
    });
});

// Start the HTTP server listening on port 3000
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
    console.log(`HTTP Server is running on port ${PORT}`);
});