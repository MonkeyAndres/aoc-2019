const { readInput } = require('../utils')

const input = readInput(2)
const formattedInput = input.split(',').map(Number)
formattedInput[1] = 12
formattedInput[2] = 2

for (let i = 0; i <= formattedInput.length; i += 4) {
  const opcode = formattedInput[i]
  if (isNaN(opcode)) break

  const [inputIndex1, inputIndex2, resultIndex] = formattedInput.slice(i + 1)

  const input1 = formattedInput[inputIndex1]
  const input2 = formattedInput[inputIndex2]

  switch (opcode) {
    case 1: {
      formattedInput[resultIndex] = input1 + input2
      continue
    }

    case 2: {
      formattedInput[resultIndex] = input1 * input2
      continue
    }

    case 99: {
      break
    }
  }
}

console.log(formattedInput[0]) // 4462686
