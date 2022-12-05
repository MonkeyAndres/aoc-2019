const { testDay } = require('../testing-utils')
const { readInput } = require('../utils')
const { part1, part2 } = require('./index')

const DAY = 8
const finalInput = readInput(DAY)

testDay(DAY, [
  {
    name: 'Part 1',
    fn: part1(25, 6),
    io: [{ input: finalInput, output: 1064 }],
  },

  {
    name: 'Part 2 - Example',
    fn: part2(2, 2),
    io: [{ input: '0222112222120000', output: '█  █' }],
  },

  {
    name: 'Part 2 - Final',
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
