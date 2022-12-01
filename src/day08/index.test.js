const { testDay } = require('../testing-utils')
const { readInput } = require('../utils')
const { part1, part2 } = require('./index')

const DAY = 8
const finalInput = readInput(DAY)

testDay(DAY, [
  {
    fn: part1(25, 6),
    io: [{ input: finalInput, output: 1064 }],
  },

  {
    fn: part2(2, 2),
    io: [{ input: '0222112222120000', output: '█  █' }],
  },

  {
    fn: part2(25, 6),
    io: [
      {
        input: finalInput,
        output: [
          '   ██    ██  ███  ██ ██ █',
          ' ██ █ ████ ██ █ ██ █ █ ██',
          ' ██ █   ██ ████ ██ █  ███',
          '   ██ ████ ████    █ █ ██',
          ' ████ ████ ██ █ ██ █ █ ██',
          ' ████ █████  ██ ██ █ ██ █',
        ].join('\n'),
      },
    ],
  },
])
