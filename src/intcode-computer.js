const F = require('./fp-utils')

const parseMemory = F.pipe(F.split(','), F.map(Number))

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

const parseParameters = (parameterModes, ip, memory) => {
  // NOTE: Start looking for params from next memory slot
  const memoryPointer = ip + 1

  return parameterModes.map((paramMode, i) => {
    const param = memory[memoryPointer + i]

    switch (paramMode) {
      case PARAMETER_MODES.position: {
        return { read: memory[param], write: param }
      }

      case PARAMETER_MODES.immediate: {
        return { read: param }
      }
    }
  })
}

const runner = input => memory => {
  const clonedMemory = [...memory]
  let lastOutput

  let inputCursor = 0

  for (let ip = 0; ip <= clonedMemory.length; ) {
    // Instruction: PPPPOO where P are param modes and O the operation code
    const instruction = String(clonedMemory[ip]).padStart(5, '0')

    const parameterModes = instruction
      .slice(0, -2)
      .split('')
      .reverse()
      .map(Number)
    const opcode = Number(instruction.slice(-2))

    const parameters = parseParameters(parameterModes, ip, clonedMemory)

    switch (opcode) {
      case OPCODES.add: {
        const [p1, p2, p3] = parameters
        clonedMemory[p3.write] = p1.read + p2.read

        ip += 4
        continue
      }

      case OPCODES.multiply: {
        const [p1, p2, p3] = parameters
        clonedMemory[p3.write] = p1.read * p2.read

        ip += 4
        continue
      }

      case OPCODES.input: {
        const [p1] = parameters
        clonedMemory[p1.write] = input[inputCursor]

        inputCursor++
        ip += 2
        continue
      }

      case OPCODES.output: {
        const [p1] = parameters
        lastOutput = p1.read

        ip += 2
        continue
      }

      case OPCODES.jumpIfTrue: {
        const [p1, p2] = parameters

        if (p1.read !== 0) {
          ip = p2.read
        } else {
          ip += 3
        }

        continue
      }

      case OPCODES.jumpIfFalse: {
        const [p1, p2] = parameters

        if (p1.read === 0) {
          ip = p2.read
        } else {
          ip += 3
        }

        continue
      }

      case OPCODES.lessThan: {
        const [p1, p2, p3] = parameters

        if (p1.read < p2.read) {
          clonedMemory[p3.write] = 1
        } else {
          clonedMemory[p3.write] = 0
        }

        ip += 4
        continue
      }

      case OPCODES.equals: {
        const [p1, p2, p3] = parameters

        if (p1.read === p2.read) {
          clonedMemory[p3.write] = 1
        } else {
          clonedMemory[p3.write] = 0
        }

        ip += 4
        continue
      }

      case OPCODES.halt: {
        return { state: clonedMemory, lastOutput }
      }

      default: {
        throw new Error(`Opcode not implemented ${opcode}`)
      }
    }
  }
}

module.exports = { parseMemory, runner }
