const fp = require('../fp-utils')

const parseInput = fp.split('\n')

// PART 1
const part1 = fp.pipe(
  parseInput,
  fp.reduce((acc, mass) => (acc += Math.floor(Number(mass) / 3) - 2), 0),
)

// PART 2
const calculateFuel = (fuel, totalFuel = 0) => {
  const remainFuel = Math.floor(Number(fuel) / 3) - 2

  if (remainFuel <= 0) {
    return totalFuel
  }

  return calculateFuel(remainFuel, totalFuel + remainFuel)
}

const part2 = fp.pipe(
  parseInput,
  fp.reduce((acc, mass) => (acc += calculateFuel(mass)), 0),
)

module.exports = { part1, part2 }
