const F = require('../fp-utils')

const parseInput = F.pipe(F.split('-'), F.map(Number))

// PART 1
const matchNormalPassword = num => {
  const nString = String(num)

  let decreasingNumbers = true
  let anyAdyacentEquals = false

  for (let i = 0; i < nString.length - 1; i++) {
    const n1 = Number(nString.charAt(i))
    const n2 = Number(nString.charAt(i + 1))

    if (n1 > n2) {
      decreasingNumbers = false
    }

    if (n1 === n2) {
      anyAdyacentEquals = true
    }
  }

  return decreasingNumbers && anyAdyacentEquals
}

const part1 = F.pipe(
  parseInput,
  F.apply(F.range),
  F.filter(matchNormalPassword),
  F.length,
)

// PART 2
const matchRestrictPassword = num => {
  const nString = String(num)

  let decreasingNumbers = true

  for (let i = 0; i < nString.length - 1; i++) {
    const n1 = Number(nString.charAt(i))
    const n2 = Number(nString.charAt(i + 1))

    if (n1 > n2) {
      decreasingNumbers = false
    }
  }

  const groupedValues = Object.values(nString).reduce(function(acc, item) {
    if (acc.length && item === acc[acc.length - 1][0]) {
      acc[acc.length - 1].push(item)
    } else {
      acc.push([item])
    }
    return acc
  }, [])

  return decreasingNumbers && groupedValues.some(item => item.length === 2)
}

const part2 = F.pipe(
  parseInput,
  F.apply(F.range),
  F.filter(matchRestrictPassword),
  F.length,
)

module.exports = { part1, matchNormalPassword, part2, matchRestrictPassword }
