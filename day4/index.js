const F = require('../fp-utils')

const parseInput = F.pipe(F.split('-'), F.map(Number))

const predicate = n => {
  const nString = String(n)

  let decreasingNumbers = true
  let adyacentEquals = false

  for (let i = 0; i < nString.length - 1; i++) {
    const n1 = Number(nString.charAt(i))
    const n2 = Number(nString.charAt(i + 1))

    if (n1 > n2) {
      decreasingNumbers = false
    }

    if (n1 === n2) {
      adyacentEquals = true
    }
  }

  return decreasingNumbers && adyacentEquals
}

const part1 = F.pipe(
  parseInput,
  F.apply(F.range),
  F.filter(predicate),
  F.length,
)

module.exports = { part1 }
