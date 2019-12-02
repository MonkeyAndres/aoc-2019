const { readInput } = require('../utils')

const input = readInput(1)
const formattedInput = input.split('\n')

const result = formattedInput.reduce(
  (acc, mass) => (acc += Math.floor(Number(mass) / 3) - 2),
  0,
)

console.log(result) // 3324332
