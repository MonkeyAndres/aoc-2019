const { testDay } = require('../testing-utils')
const { readInput } = require('../utils')
const { part1, part2 } = require('./index')

const DAY = 6
const finalInput = readInput(DAY)

testDay(DAY, [
  {
    fn: part1,
    io: [
      {
        input: `COM)B
B)C
B)G
G)H`,
        output: 8,
      },
      {
        input: `COM)B
B)C
C)D
D)E
E)F
B)G
G)H
D)I
E)J
J)K
K)L`,
        output: 42,
      },
      { input: finalInput, output: 110190 },
    ],
  },
  {
    fn: part2,
    io: [
      {
        input: `COM)B
B)C
C)D
D)E
E)F
B)G
G)H
D)I
E)J
J)K
K)L
K)YOU
I)SAN`,
        output: 4,
      },
      { input: finalInput, output: 343 },
    ],
  },
])
