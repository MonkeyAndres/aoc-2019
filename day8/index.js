const F = require('../fp-utils')

const WIDTH = 25
const HEIGHT = 6
const LAYER_LENGTH = WIDTH * HEIGHT

const divideInLayers = input => {
  const numberOfLayers = input.length / LAYER_LENGTH
  const layers = []

  for (let layerIndex = 0; layerIndex < numberOfLayers; layerIndex++) {
    const start = LAYER_LENGTH * layerIndex
    const layer = input.substring(start, start + LAYER_LENGTH)
    layers.push(layer)
  }

  return layers
}

const numberOfZeros = F.occurrences('0')

const getLessZeroLayer = layers =>
  layers.reduce((acc, layer) => {
    if (numberOfZeros(acc) > numberOfZeros(layer)) {
      return layer
    }

    return acc
  })

const part1 = F.pipe(
  divideInLayers,
  getLessZeroLayer,
  lessZeroLayer =>
    F.occurrences('1', lessZeroLayer) * F.occurrences('2', lessZeroLayer),
)

module.exports = { part1 }
