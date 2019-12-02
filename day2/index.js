const fp = require('../fp-utils')

const parseInput = fp.pipe(fp.split(','), fp.map(Number))

const run = input => {
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

const part1 = fp.pipe(
  parseInput,
  fp.updateAtIndex(1, 12),
  fp.updateAtIndex(2, 2),
  run,
  fp.nth(0),
)

module.exports = { part1 }
