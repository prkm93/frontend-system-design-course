const express = require('express');

const PORT = 3010;
const app = express();

app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self';" +
      "script-src 'self' 'unsafe-inline' 'nonce-randomKey' http://unsecure.com;" +
      'img-src https://media.licdn.com'
  ); // load only content, resource or anything from own source
  next();
});
// unsafe-inline directive, executes any inline script
// when adding nonce as directive, then only script which has nonce set will be executed and script without nonce willn't be executed. The nonce set in CSP shuold match with nonce set in script. If matches, then only script executes.
// in img-src , if we try to load the image with any other source url , it will fail to load.

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
