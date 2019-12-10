const { testDay } = require('../testing-utils')
const { readInput } = require('../utils')
const { part1, part2, runner } = require('./index')

const DAY = 5
const finalInput = readInput(DAY)

testDay(DAY, [
  {
    fn: part1,
    io: [{ input: finalInput, output: 7157989 }],
  },

  {
    fn: part2,
    io: [{ input: finalInput, output: 7873292 }],
  },

  {
    fn: runner(8),
    io: [
      {
        input: [3, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8],
        output: { lastOutput: 1, state: [3, 9, 8, 9, 10, 9, 4, 9, 99, 1, 8] },
      },
    ],
  },
])
