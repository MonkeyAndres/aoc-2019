const F = require('../fp-utils')

const PARAMETER_MODES = {
  position: 0,
  immediate: 1,
}

const OPCODES = {
  add: 1,
  multiply: 2,
  input: 3,
  output: 4,
  jumpIfTrue: 5,
  jumpIfFalse: 6,
  lessThan: 7,
  equals: 8,
  halt: 99,
}

let lastOutput

const parseInput = F.pipe(F.split(','), F.map(Number))

const getValuePointer = (instruction, ip, input) => {
  const parameters = input.slice(ip + 1)
  const parameterModes = instruction
    .slice(0, -2)
    .split('')
    .reverse()

  return parameterModes.map((paramMode, i) => {
    const param = parameters[i]

    switch (Number(paramMode)) {
      case PARAMETER_MODES.position: {
        return { read: input[param], write: param }
      }

      case PARAMETER_MODES.immediate: {
        return { read: param }
      }
    }
  })
}

const runner = input => state => {
  const cloneState = [...state]
  let lastOutput

  for (let ip = 0; ip <= cloneState.length; ) {
    const instruction = String(cloneState[ip]).padStart(5, '0')
    const opcode = Number(instruction.slice(-2))
    const values = getValuePointer(instruction, ip, cloneState)

    switch (opcode) {
      case OPCODES.add: {
        const [val1, val2, val3] = values
        cloneState[val3.write] = val1.read + val2.read

        ip += 4
        continue
      }

      case OPCODES.multiply: {
        const [val1, val2, val3] = values
        cloneState[val3.write] = val1.read * val2.read

        ip += 4
        continue
      }

      case OPCODES.input: {
        const [val1] = values
        cloneState[val1.write] = input

        ip += 2
        continue
      }

      case OPCODES.output: {
        const [val1] = values
        lastOutput = val1.read

        ip += 2
        continue
      }

      case OPCODES.jumpIfTrue: {
        const [val1, val2] = values

        if (val1.read !== 0) {
          ip = val2.read
        } else {
          ip += 3
        }

        continue
      }

      case OPCODES.jumpIfFalse: {
        const [val1, val2] = values

        if (val1.read === 0) {
          ip = val2.read
        } else {
          ip += 3
        }

        continue
      }

      case OPCODES.lessThan: {
        const [val1, val2, val3] = values

        if (val1.read < val2.read) {
          cloneState[val3.write] = 1
        } else {
          cloneState[val3.write] = 0
        }

        ip += 4
        continue
      }

      case OPCODES.equals: {
        const [val1, val2, val3] = values

        if (val1.read === val2.read) {
          cloneState[val3.write] = 1
        } else {
          cloneState[val3.write] = 0
        }

        ip += 4
        continue
      }

      case OPCODES.halt: {
        return { state: cloneState, lastOutput }
      }

      default: {
        throw new Error(`Opcode not implemented ${opcode}`)
      }
    }
  }
}

// PART 1
const part1 = F.pipe(parseInput, runner(1), F.prop('lastOutput'))

// PART 2
const part2 = F.pipe(parseInput, runner(5), F.prop('lastOutput'))

module.exports = { part1, part2, runner }
