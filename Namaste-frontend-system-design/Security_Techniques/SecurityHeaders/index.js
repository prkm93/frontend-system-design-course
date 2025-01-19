const express = require('express');
const app = express();

// In response headers, there is 'x-powered-by: Express' , we don't want to show the server and attackers willn't be aware what kind of server is being used.

app.use((req, res, next) => {
  res.removeHeader('X-Powered-By');
  next();
});

app.get('/lists', (req, res) => {
  res.send([
    {
      id: 1,
      title: 'Namaste Frontend System Design',
    },
  ]);
});

const PORT = process.env.PORT || 5010;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
