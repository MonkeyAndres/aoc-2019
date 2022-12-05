const { testDay } = require('../testing-utils')
const {
  part1,
  part2,
  matchNormalPassword,
  matchRestrictPassword,
} = require('./index')

const DAY = 4
const finalInput = '240298-784956'

testDay(
  DAY,
  [
    {
      name: 'Part 1',
      fn: part1,
      io: [{ input: finalInput, output: 1150 }],
    },

    {
      name: 'Part 2',
      fn: part2,
      io: [{ input: finalInput, output: 748 }],
    },
  ],
  () => {
    it('tests matchNormalPassword', () => {
      expect(matchNormalPassword(111111)).toBe(true)
      expect(matchNormalPassword(223456)).toBe(true)
      expect(matchNormalPassword(788899)).toBe(true)

      expect(matchNormalPassword(223450)).toBe(false)
      expect(matchNormalPassword(123789)).toBe(false)
    })

    it('tests matchRestrictPassword', () => {
      expect(matchRestrictPassword(112233)).toBe(true)
      expect(matchRestrictPassword(111122)).toBe(true)
      expect(matchRestrictPassword(123444)).toBe(false)
    })
  },
)
