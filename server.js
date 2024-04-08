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

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});
