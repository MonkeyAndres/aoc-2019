const { testDay } = require('../testing-utils')
const { part1, part2 } = require('./index')

const DAY = 4
const finalInput = '240298-784956'

testDay(DAY, [
  {
    fn: part1,
    io: [{ input: finalInput, output: 1150 }],
  },

  {
    fn: part2,
    disable: true,
    io: [],
  },
])
