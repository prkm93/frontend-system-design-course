const express = require('express');
const app = express();

let data = 'Initial Data';
const waitingClientLists = [];

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/getData', (req, res) => {
  // if there is data available, send to client immediately
  if (data !== req.query.lastData) {
    res.json({
      data,
    });
  } else {
    // if no immediate data available and since multiple client will be making the requests, so to hold request of each client,  store response in list
    // whenever data will be available, it will be sent to all clients.
    waitingClientLists.push(res);
  }
});

// Use post/put to update data. For simplicty here get is used
app.get('/updateData', (req, res) => {
  data = req.query.data;

  while (waitingClientLists.length > 0) {
    const client = waitingClientLists.pop(); // client is basically response object. Similarly all clients are response objects for each and every client.
    client.json({ data });
  }

  res.send({ success: 'Data updated successfully' });
});

const port = process.env.PORT || 5011;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
