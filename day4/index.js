const F = require('../fp-utils')

const DEFAULT_MIN_GROUP_LENGTH = 2
const GROUP_LENGTH = 2

const parseInput = F.pipe(F.split('-'), F.map(Number))

const decreasingNumbers = num => {
  const nString = String(num)

  for (let i = 0; i < nString.length - 1; i++) {
    const n1 = Number(nString.charAt(i))
    const n2 = Number(nString.charAt(i + 1))

    if (n1 > n2) {
      return false
    }
  }

  return true
}

const adjacentEquals = groupLength => num => {
  const nString = String(num)

  const groupedValues = Object.values(nString).reduce((acc, item) => {
    const lastGroupIndex = acc.length - 1

    if (acc.length && item === acc[lastGroupIndex][0]) {
      acc[lastGroupIndex].push(item)
    } else {
      acc.push([item])
    }

    return acc
  }, [])

  return groupLength
    ? // At least one group with "groupLength" elements
      groupedValues.some(item => item.length === groupLength)
    : // At least one group with minimum "DEFAULT_MIN_GROUP_LENGTH" elements
      groupedValues.some(item => item.length >= DEFAULT_MIN_GROUP_LENGTH)
}

// PART 1
const matchNormalPassword = F.allPass([decreasingNumbers, adjacentEquals()])

const part1 = F.pipe(
  parseInput,
  F.apply(F.range),
  F.filter(matchNormalPassword),
  F.length,
)

// PART 2
const matchRestrictPassword = F.allPass([
  decreasingNumbers,
  adjacentEquals(GROUP_LENGTH),
])

const part2 = F.pipe(
  parseInput,
  F.apply(F.range),
  F.filter(matchRestrictPassword),
  F.length,
)

module.exports = { part1, matchNormalPassword, part2, matchRestrictPassword }
