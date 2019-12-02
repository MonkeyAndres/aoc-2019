const { testDay } = require('../testing-utils')
const { readInput } = require('../utils')
const { part1, part2 } = require('./index')

const finalInput = readInput(2)

testDay(2, [
  {
    fn: part1,
    io: [{ input: finalInput, output: 4462686 }],
  },
])
