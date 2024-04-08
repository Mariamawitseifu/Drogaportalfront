// const { createServer } = require('http');
// const { parse } = require('url');
// const next = require('next');

// const dev = process.env.NODE_ENV !== 'production';
// const app = next({ dev });
// const handle = app.getRequestHandler();
// const port = process.env.PORT || 3000;

// app.prepare().then(() => {
//     createServer((req, res) => {
//         const parsedUrl = parse(req.url, true);
//         const { pathname, query } = parsedUrl;

//         if (pathname === '/page.js') {
//             app.render(req, res, '/page.js', query);
//         } else if (pathname === '/page.js') {
//             app.render(req, res, '/page.js', query);
//         } else {
//             handle(req, res, parsedUrl);
//         }
//     }).listen(port, (err) => {
//         if (err) throw err;
//         console.log(`> Ready on http://localhost:${port}`);
//     });
// });


const express = require('express');
const next = require('next');
const http = require('http');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const port = process.env.PORT || 3000;
const server = express();

app.prepare().then(() => {
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  const httpServer = http.createServer(server);

  httpServer.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});