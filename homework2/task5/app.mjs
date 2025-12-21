// app.mjs
import { createServer } from 'node:http';
import fs from 'fs'
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const settingsPath = path.join(__dirname, 'settings.json')
const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf-8'))
const historyFile = path.join(__dirname, settings.historyFilePath)
const historyRoute = settings.historyRoute

const loadHistory = () => {
  if (!fs.existsSync(historyFile)) {
    return {}
  }
  return JSON.parse(fs.readFileSync(historyFile, 'utf-8'))
}

const saveHistory = (history) => {
  fs.writeFileSync(historyFile, JSON.stringify(history, null, 2))
}

const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  const url = req.url

  if (url === historyRoute) {
    const history = loadHistory()
    return res.end(JSON.stringify(history, null, 2))
  }

  const historyData = loadHistory()
  historyData[url] = (historyData[url] || 0) + 1
  saveHistory(historyData)

  res.end('Route added to history!')

});

// starts a simple http server locally on port 3000
server.listen(3000, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:3000');
});

// run with `node app.mjs`

