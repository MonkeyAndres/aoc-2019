const F = require('../fp-utils')
const { runner, parseMemory } = require('../intcode-computer')

const testPhaseSettingSequence = (memory, phaseSettingSequence) => {
  let nextAmplifierInput = 0

  for (let phaseSetting of phaseSettingSequence) {
    const { lastOutput } = runner([phaseSetting, nextAmplifierInput])(memory)

    nextAmplifierInput = lastOutput
  }

  return nextAmplifierInput
}

const createPossibleCombinations = (terms, size) => {
  const result = []

  const addToCombination = draftCombination => term => {
    if (draftCombination.includes(term)) {
      return
    }

    const newCombination = [...draftCombination, term]

    if (newCombination.length === size) {
      result.push(newCombination)
      return
    }

    terms.forEach(addToCombination(newCombination))
  }

  terms.forEach(addToCombination([]))

  return result
}

const part1 = memory => {
  const parsedMemory = parseMemory(memory)

  let highestOutput = 0

  const sequences = createPossibleCombinations([0, 1, 2, 3, 4], 5)

  for (let sequence of sequences) {
    const output = testPhaseSettingSequence(parsedMemory, sequence)

    if (output > highestOutput) {
      highestOutput = output
    }
  }

  return highestOutput
}

module.exports = { part1, testPhaseSettingSequence }
