const { testDay } = require('../testing-utils')
const { readInput } = require('../utils')
const { part1, part2, testPhaseSettingSequence } = require('./index')

const DAY = 7
const finalInput = readInput(DAY)

testDay(
  DAY,
  [
    {
      name: 'Part 1',
      fn: part1,
      io: [{ input: finalInput, output: 47064 }],
    },
  ],
  () => {
    describe('Test amplifier phase setting sequences', () => {
      it(`Example #1`, () => {
        const memory = [
          3, 15, 3, 16, 1002, 16, 10, 16, 1, 16, 15, 15, 4, 15, 99, 0, 0,
        ]
        const phaseSettingSequence = [4, 3, 2, 1, 0]

        const result = testPhaseSettingSequence(memory, phaseSettingSequence)

        expect(result).toEqual(43210)
      })

      it(`Example #2`, () => {
        const memory = [
          3, 23, 3, 24, 1002, 24, 10, 24, 1002, 23, -1, 23, 101, 5, 23, 23, 1,
          24, 23, 23, 4, 23, 99, 0, 0,
        ]
        const phaseSettingSequence = [0, 1, 2, 3, 4]

        const result = testPhaseSettingSequence(memory, phaseSettingSequence)

        expect(result).toEqual(54321)
      })

      it(`Example #3`, () => {
        const memory = [
          3, 31, 3, 32, 1002, 32, 10, 32, 1001, 31, -2, 31, 1007, 31, 0, 33,
          1002, 33, 7, 33, 1, 33, 31, 31, 1, 32, 31, 31, 4, 31, 99, 0, 0, 0,
        ]
        const phaseSettingSequence = [1, 0, 4, 3, 2]

        const result = testPhaseSettingSequence(memory, phaseSettingSequence)

        expect(result).toEqual(65210)
      })
    })
  },
)
