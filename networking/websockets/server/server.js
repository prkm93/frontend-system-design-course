const express = require('express');
const WebSocket = require('ws');

const app = express();
app.use(express.json());

// Initialize WebSocket Server
const wsktServer = new WebSocket.Server({ port: 8080 });

// WebSocket event handling ( this gets triggered once client gets connected)
wsktServer.on('connection', (ws) => {
  console.log('A new client connected');

  // Event listener for incoming messages
  ws.on('message', (message) => {
    console.log('Received message: ', message.toString());

    // Broadcast message to all connected clients
    wsktServer.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });

  // event listener for client disconnection
  ws.on('close', () => {
    console.log('A client disconnected');
  });
});

const port = 3000;

app.listen(port, () => {
  console.log(`server started on http://localhost:${port}`);
});
