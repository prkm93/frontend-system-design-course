const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);

// let data = 'Initial Data';

app.get('/', (req, res) => {
  res.sendFile(join(__dirname + '/index.html'));
});

io.on('connection', (socket) => {
  console.log('connection established'); // creates websocket connection

  socket.on('chat message', (msg) => {
    console.log('received message', msg);

    // listening to any input message
    io.emit('chat message', msg); // broadcasting to a new event
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(3000, () => {
  console.log(`server is running at http://localhost:3000`);
});
