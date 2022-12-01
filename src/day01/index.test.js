const { testDay } = require('../testing-utils')
const { readInput } = require('../utils')
const { part1, part2 } = require('./index')

const DAY = 1
const finalInput = readInput(DAY)

testDay(DAY, [
  {
    fn: part1,
    io: [
      { input: '12', output: 2 },
      { input: '14', output: 2 },
      { input: '1969', output: 654 },
      { input: '100756', output: 33583 },
      { input: finalInput, output: 3324332 },
    ],
  },

  {
    fn: part2,
    io: [
      { input: '14', output: 2 },
      { input: '1969', output: 966 },
      { input: '100756', output: 50346 },
      { input: finalInput, output: 4983626 },
    ],
  },
])
