const { testDay } = require('../testing-utils')
const { readInput } = require('../utils')
const { part1 } = require('./index')

const DAY = 8
const finalInput = readInput(DAY)

testDay(DAY, [
  {
    fn: part1,
    io: [{ input: finalInput, output: 1064 }],
  },

  // {
  //   fn: part2,
  //   io: [{ input: finalInput, output: 1064 }],
  // },
])
