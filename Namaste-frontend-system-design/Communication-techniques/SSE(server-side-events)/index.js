const express = require('express');
const { join } = require('node:path');

const app = express();

// let data = 'Initial Data';

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, '/index.html'));
});

app.get('/sse', (req, res) => {
  //setup sse logic
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Connection', 'keep-alive'); // long lived connection
  res.setHeader('Cache-Control', 'no-cache');

  res.write('data: Welcome to Server Sent Event \n\n');

  const intervalId = setInterval(() => {
    res.write(`data: Server time ${new Date().toLocaleString()} \n\n`);
  }, 5000);

  req.on('close', () => {
    clearInterval(intervalId);
  });
});

app.listen(3000, () => {
  console.log(`server is running at http://localhost:3000`);
});
