const { testDay } = require('../testing-utils')
const { readInput } = require('../utils')
const { part1, part2 } = require('./index')

const DAY = 2
const finalInput = readInput(DAY)

testDay(DAY, [
  {
    fn: part1,
    io: [{ input: finalInput, output: 4462686 }],
  },

  {
    fn: part2,
    io: [{ input: finalInput, output: 5936 }],
  },
])
