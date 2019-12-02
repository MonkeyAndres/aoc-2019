const F = require('../fp-utils')

const parseInput = F.pipe(F.split(','), F.map(Number))

const runner = input => {
  const cloneInput = [...input]

  for (let i = 0; i <= cloneInput.length; i += 4) {
    const opcode = cloneInput[i]
    if (isNaN(opcode)) return

    const [inputIndex1, inputIndex2, resultIndex] = cloneInput.slice(i + 1)

    const input1 = cloneInput[inputIndex1]
    const input2 = cloneInput[inputIndex2]

    switch (opcode) {
      case 1: {
        cloneInput[resultIndex] = input1 + input2
        continue
      }

      case 2: {
        cloneInput[resultIndex] = input1 * input2
        continue
      }

      case 99: {
        return cloneInput
      }
    }
  }
}

const runWithNounVerb = (noun, verb) =>
  F.pipe(setNounVerb(noun, verb), runner, F.nth(0))

const setNounVerb = (noun, verb) =>
  F.pipe(F.updateAtIndex(1, noun), F.updateAtIndex(2, verb))

// PART 1
const part1 = F.pipe(parseInput, runWithNounVerb(12, 2))

// PART 2
const getNounVerb = F.curry((expectedValue, formattedInput) => {
  for (let n = 0; n <= 99; n++) {
    for (let v = 0; v <= 99; v++) {
      const res = runWithNounVerb(n, v)(formattedInput)

      if (res === expectedValue) {
        return [n, v]
      }
    }
  }
})

const part2 = F.pipe(
  parseInput,
  getNounVerb(19690720),
  ([noun, verb]) => 100 * noun + verb,
)

module.exports = { part1, part2 }
