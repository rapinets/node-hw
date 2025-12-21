import fs from 'node:fs';
import { createServer } from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const FILE_PATH = path.join(__dirname, 'numbers.txt')

const server = createServer((req, res) => {
  const reqUrl = req.url;
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' })

  // /save_num
  if (reqUrl.startsWith('/save_num/')) {
    const num = Number(reqUrl.split('/')[2])

    if (isNaN(num)) {
      return res.end('Передано не число')
    }

    fs.appendFileSync(FILE_PATH, num + ' ')
    return res.end(`Число ${num} збережено`)
  }

  // /sum
  if (reqUrl === '/sum') {
    if (!fs.existsSync(FILE_PATH)) {
      return res.end('Файл не існує')
    }

    const numbers = fs.readFileSync(FILE_PATH, 'utf-8')
      .trim()
      .split(' ')
      .map(Number);

    const sum = numbers.reduce((a, b) => a + b, 0)
    return res.end(`Сума: ${sum}`)
  }

  // /mult
  if (reqUrl === '/mult') {
    if (!fs.existsSync(FILE_PATH)) {
      return res.end('Файл не існує')
    }

    const numbers = fs.readFileSync(FILE_PATH, 'utf-8')
      .trim()
      .split(' ')
      .map(Number)

    const mult = numbers.reduce((a, b) => a * b, 1)
    return res.end(`Добуток: ${mult}`)
  }

  // /remove
  if (reqUrl === '/remove') {
    if (!fs.existsSync(FILE_PATH)) {
      return res.end('Файл вже видалений')
    }

    fs.unlinkSync(FILE_PATH);
    return res.end('Файл видалено')
  }

  res.statusCode = 404;
  res.end('Роут не знайдено')
});

server.listen(3000, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:3000');
});
