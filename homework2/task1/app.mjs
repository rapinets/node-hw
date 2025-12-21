/*
Задача 1. У консольний додаток передають через параметр пенсійний вік.
Потім питаємо у терміналі користувача скільки йому років (використати “readline”) і кажемо чи він є пенсіонером.
*/

import { argv } from 'node:process'
import readline from 'node:readline'

const args = argv.slice(2)
const argsObj = new URLSearchParams(args[0])

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.question('Скільки вам років? ', (answer) => {
  if (answer === parseInt(argsObj.get('--pension'))) {
    console.log(`Ви є пенсіонер, вам більне ${argsObj.get('--pension')}-ти років!`)
  } else {
    console.log(`Ви ще молодий вам менше ${argsObj.get('--pension')}-ти років!`)
  }

  rl.close()
})