/**
 * Розробити додаток з такими маршрутами:
 * season - повертає пору року
 * day - повертає поточний день
 * time - повертає час дня (ранок, обід, вечеря)
 */

import express from 'express'
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello world!')
})

app.get('/season', (req, res) => {
  const month = new Date().getMonth() + 1
  let season
  switch (month) {
    case 3:
    case 4:
    case 5:
      season = 'Spring'
      break
    case 6:
    case 7:
    case 8:
      season = 'Summer'
      break
    case 9:
    case 10:
    case 11:
      season = 'Fall'
      break
    default:
      season = 'Winter'
      break
  }
  res.send(season)
})

app.get('/day', (req, res) => {
  const daysTitles = ['Sum', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const dayNum = new Date().getDay()
  res.send(daysTitles[dayNum])
})

app.get('/time', (req, res) => {
  const hours = new Date().getHours()
  let time
  if (hours <= 11) {
    time = 'Morning'
  } else if (hours <= 17) {
    time = 'Dinner'
  } else {
    time = 'Evening'
  }
  res.send(time)
})

app.listen(port, () => {
  console.log(`Сервер запущено на http://localhost:${port}`)
})