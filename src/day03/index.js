/**
 * ATTENTION: INCOMPLETE SOLUTION AND LOW PERFORMANCE
 */

const F = require('../fp-utils')

const DEFAULT_POSITION = [0, 0]

const parseInput = F.pipe(F.split('\n'), F.map(F.split(',')))

const safetyIncrementPosition = ([x, y], arr, firstWire) => {
  if (!arr[y]) {
    arr[y] = {}
  }

  arr[y][x] = arr[y][x] && !firstWire ? arr[y][x] + 1 : 1
}

const calculateWirePath = (wire, board) => {
  const actualPosition = [...DEFAULT_POSITION]
  const safetyBoard = board ? { ...board } : {}
  const isFirstWire = !board ? true : false

  return wire.reduce((acc, instruction) => {
    const direction = instruction.charAt(0)
    const steps = Number(instruction.substring(1))

    switch (direction) {
      case 'R': {
        for (let i = 1; i <= steps; i++) {
          actualPosition[0] += 1
          safetyIncrementPosition(actualPosition, acc, isFirstWire)
        }

        break
      }
      case 'D': {
        for (let i = 1; i <= steps; i++) {
          actualPosition[1] -= 1
          safetyIncrementPosition(actualPosition, acc, isFirstWire)
        }

        break
      }
      case 'U': {
        for (let i = 1; i <= steps; i++) {
          actualPosition[1] += 1
          safetyIncrementPosition(actualPosition, acc, isFirstWire)
        }

        break
      }
      case 'L': {
        for (let i = 1; i <= steps; i++) {
          actualPosition[0] -= 1
          safetyIncrementPosition(actualPosition, acc, isFirstWire)
        }

        break
      }
    }

    return acc
  }, safetyBoard)
}

const findIntersections = board =>
  Object.entries(board).flatMap(([y, row]) =>
    Object.entries(row)
      .map(([index, val]) => ({
        val,
        index,
      }))
      .filter(item => item.val === 2)
      .map(item => [Number(item.index), Number(y)]),
  )

const part1 = F.pipe(
  parseInput,
  ([w1, w2]) => calculateWirePath(w2, calculateWirePath(w1)),
  findIntersections,
  F.nth(0),
  F.apply(F.add),
)

const stepsToPoint = (wire, point) => {
  const actualPosition = [...DEFAULT_POSITION]
  let doneSteps = 0

  for (let instruction of wire) {
    const direction = instruction.charAt(0)
    const steps = Number(instruction.substring(1))

    switch (direction) {
      case 'R': {
        for (let i = 1; i <= steps; i++) {
          if (F.equals(actualPosition, point)) {
            return doneSteps
          }

          actualPosition[0] += 1
          doneSteps += 1
        }

        break
      }
      case 'D': {
        for (let i = 1; i <= steps; i++) {
          if (F.equals(actualPosition, point)) {
            return doneSteps
          }

          actualPosition[1] -= 1
          doneSteps += 1
        }

        break
      }
      case 'U': {
        for (let i = 1; i <= steps; i++) {
          if (F.equals(actualPosition, point)) {
            return doneSteps
          }

          actualPosition[1] += 1
          doneSteps += 1
        }

        break
      }
      case 'L': {
        for (let i = 1; i <= steps; i++) {
          if (F.equals(actualPosition, point)) {
            return doneSteps
          }

          actualPosition[0] -= 1
          doneSteps += 1
        }

        break
      }
    }
  }

  return doneSteps
}

const part2 = input => {
  const [w1, w2] = parseInput(input)

  return F.pipe(
    ([w1, w2]) => calculateWirePath(w2, calculateWirePath(w1)),
    findIntersections,
    F.map(
      intersection =>
        stepsToPoint(w1, intersection) + stepsToPoint(w2, intersection),
    ),
    F.apply(Math.min),
  )([w1, w2])
}

module.exports = { part1, part2 }
