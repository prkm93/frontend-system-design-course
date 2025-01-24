const express = require('express');
const app = express();

const redirectToHttps = (req, res, next) => {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    // Redirect to HTTPS
    return res.redirect(['https://', req.get('Host'), req.url].join(''));
  }
  next();
};

app.use(redirectToHttps);

// In response headers, there is 'x-powered-by: Express' , we don't want to show the server and attackers willn't be aware what kind of server is being used.

app.use((req, res, next) => {
  res.setHeader('Referrer-Policy', 'no-referrer');
  res.removeHeader('X-Powered-By');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains; preload'
  );
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
