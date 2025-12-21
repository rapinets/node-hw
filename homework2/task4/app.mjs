// server.mjs
import { createServer } from 'node:http';
import fs from 'fs'
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const server = createServer((req, res) => {

  let fileName

  switch (req.url) {
    case '/':
      fileName = 'index.html'
      break;

    case '/coffee':
      fileName = 'coffee.html'
      break

    case '/music':
      fileName = 'music.html'
      break

    default:
      res.writeHead(200, { 'Content-Type': 'text/plain' })
      return res.end('File not found!\n')
  }

  const filePath = path.join(__dirname, fileName)

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' })
      res.end('Sorry file corrupted!\n')
      return
    }

    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end(data)
  })
});

// starts a simple http server locally on port 3000
server.listen(3000, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:3000');
});

// run with `node server.mjs`
