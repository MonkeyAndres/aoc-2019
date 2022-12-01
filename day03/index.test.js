const { testDay } = require('../testing-utils')
const { readInput } = require('../utils')
const { part1, part2 } = require('./index')

const DAY = 3
const finalInput = readInput(DAY)

testDay(DAY, [
  {
    fn: part1,
    disable: true,
    io: [
      {
        input: `R8,U5,L5,D3
U7,R6,D4,L4`,
        output: 6,
      },
      {
        input: `R75,D30,R83,U83,L12,D49,R71,U7,L72
U62,R66,U55,R34,D71,R55,D58,R83`,
        output: 159,
      },
      {
        input: `R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51
U98,R91,D20,R16,D67,R40,U7,R15,U6,R7`,
        output: 135,
      },
      { input: finalInput, output: 403 },
    ],
  },

  {
    fn: part2,
    disable: true,
    io: [
      {
        input: `R8,U5,L5,D3
      U7,R6,D4,L4`,
        output: 30,
      },
      {
        input: `R75,D30,R83,U83,L12,D49,R71,U7,L72
U62,R66,U55,R34,D71,R55,D58,R83`,
        output: 610,
      },
      {
        input: `R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51
      U98,R91,D20,R16,D67,R40,U7,R15,U6,R7`,
        output: 410,
      },
      { input: finalInput, output: 4158 },
    ],
  },
])
