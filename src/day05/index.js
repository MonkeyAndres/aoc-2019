const F = require('../fp-utils')
const { parseMemory, runner } = require('../intcode-computer')

// PART 1
const part1 = F.pipe(parseMemory, runner([1]), F.prop('lastOutput'))

// PART 2
const part2 = F.pipe(parseMemory, runner([5]), F.prop('lastOutput'))

module.exports = { part1, part2, runner }
