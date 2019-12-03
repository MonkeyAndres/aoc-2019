const F = require('../fp-utils')

const parseInput = F.pipe(F.split('\n'), F.map(F.split(',')))

const safetyIncrementPosition = ([x, y], arr) => {
  if (!arr[y]) {
    arr[y] = []
  }

  arr[y][x] = arr[y][x] ? arr[y][x] + 1 : 1
}

const calculateWirePath = (wire, board) => {
  const actualPosition = [0, 0]
  const safetyBoard = board ? [...board] : []

  return wire.reduce((acc, instruction) => {
    const direction = instruction.charAt(0)
    const steps = Number(instruction.substring(1))

    switch (direction) {
      case 'R': {
        for (let i = 1; i <= steps; i++) {
          actualPosition[0] += 1
          safetyIncrementPosition(actualPosition, acc)
        }

        break
      }
      case 'D': {
        for (let i = 1; i <= steps; i++) {
          actualPosition[1] -= 1
          safetyIncrementPosition(actualPosition, acc)
        }

        break
      }
      case 'U': {
        for (let i = 1; i <= steps; i++) {
          actualPosition[1] += 1
          safetyIncrementPosition(actualPosition, acc)
        }

        break
      }
      case 'L': {
        for (let i = 1; i <= steps; i++) {
          actualPosition[0] -= 1
          safetyIncrementPosition(actualPosition, acc)
        }

        break
      }
    }

    return acc
  }, safetyBoard)
}

const findCloserIntersection = manhattan => {
  for (let y in manhattan) {
    const x = manhattan[y].indexOf(2)

    if (x > 0) {
      return [x, Number(y)]
    }
  }
}

const part1 = F.pipe(
  parseInput,
  ([w1, w2]) => calculateWirePath(w2, calculateWirePath(w1)),
  findCloserIntersection,
  F.apply(F.add),
)

module.exports = { part1 }
