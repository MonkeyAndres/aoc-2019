const { readInput } = require('../utils')

const input = readInput(1)
const formattedInput = input.split('\n')

const calculateFuel = (fuel, totalFuel = 0) => {
  const remainFuel = Math.floor(Number(fuel) / 3) - 2

  if (remainFuel <= 0) {
    return totalFuel
  }

  return calculateFuel(remainFuel, totalFuel + remainFuel)
}

const result = formattedInput.reduce(
  (acc, mass) => (acc += calculateFuel(mass)),
  0,
)

console.log(result) // 4983626
