const F = require('../fp-utils')

const parseInput = F.pipe(F.split('\n'), F.map(F.split(',')))

const safetyIncrement = ([x, y], arr) => {
  if (!arr[y]) {
    arr[y] = []
  }

  arr[y][x] = arr[y][x] ? arr[y][x] + 1 : 1
}

const calculateWirePath = (wire, manhattan) => {
  const actualPos = [0, 0]

  wire.forEach(instruction => {
    const direction = instruction.charAt(0)
    const steps = Number(instruction.substring(1))

    switch (direction) {
      case 'R': {
        for (let i = 1; i <= steps; i++) {
          actualPos[0] += 1
          safetyIncrement(actualPos, manhattan)
        }

        break
      }
      case 'D': {
        for (let i = 1; i <= steps; i++) {
          actualPos[1] -= 1
          safetyIncrement(actualPos, manhattan)
        }

        break
      }
      case 'U': {
        for (let i = 1; i <= steps; i++) {
          actualPos[1] += 1
          safetyIncrement(actualPos, manhattan)
        }

        break
      }
      case 'L': {
        for (let i = 1; i <= steps; i++) {
          actualPos[0] -= 1
          safetyIncrement(actualPos, manhattan)
        }

        break
      }
    }
  })
}

const findCloserIntersection = manhattan => {
  for (let y in manhattan) {
    const x = manhattan[y].indexOf(2)

    if (x > 0) {
      return [y, x]
    }
  }
}

const part1 = input => {
  const [wire1, wire2] = parseInput(input)
  const manhattan = []

  calculateWirePath(wire1, manhattan)
  calculateWirePath(wire2, manhattan)

  const intersectionPoint = findCloserIntersection(manhattan)

  return Number(intersectionPoint[0]) + Number(intersectionPoint[1])
}

module.exports = { part1 }
