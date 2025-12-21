/**
 * Через параметри запиту передають операцію (add, subtract, mult) і числа (розділені дефісами), які треба опрацювати. 
 * Знайти результат і повернути користувачу. Наприклад при запиті:
 * http://localhost:3000/add/12-4-23-45   - треба знайти суму чисел 12,4,23,45
 */

// app.mjs
import { createServer } from 'node:http';

const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
  const parts = req.url.split('/').filter(Boolean)

  const operation = parts[0]
  const numbersPart = parts[1]

  if (!operation || !numbersPart) {
    return res.end('Невірний формат запиту')
  }

  const numbers = numbersPart.split('-').map(Number)

  if (numbers.some(isNaN)) {
    return res.end('Усі значення повинні бути числами')
  }

  let result
  switch (operation) {
    case 'add':
      result = numbers.reduce((a, b) => a + b, 0)
      break

    case 'subtract':
      result = numbers.reduce((a, b) => a - b)
      break

    case 'mult':
      result = numbers.reduce((a, b) => a * b, 1)
      break

    default:
      return res.end('Невідома операція')
  }

  res.end(`Результат: ${result}`);
});

// starts a simple http server locally on port 3000
server.listen(3000, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:3000');
});

// run with `node app.mjs`
