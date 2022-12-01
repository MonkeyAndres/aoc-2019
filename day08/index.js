const F = require('../fp-utils')

const divideInLayers = layerLength => input => {
  const numberOfLayers = input.length / layerLength
  const layers = []

  for (let layerIndex = 0; layerIndex < numberOfLayers; layerIndex++) {
    const start = layerLength * layerIndex
    const layer = input.substring(start, start + layerLength)
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

const part1 = (w, h) =>
  F.pipe(
    divideInLayers(w * h),
    getLessZeroLayer,
    lessZeroLayer =>
      F.occurrences('1', lessZeroLayer) * F.occurrences('2', lessZeroLayer),
  )

const part2 = (w, h) =>
  F.pipe(
    divideInLayers(w * h),
    F.map(F.split('')),
    F.reduce(
      (acc, layer) =>
        acc.map((num, index) => (num !== '2' ? num : layer[index])),
      undefined,
    ),
    F.join(''),

    // Replace with character for seen image
    F.replace(/0/g, '█'),
    F.replace(/1/g, ' '),
    divideInLayers(25),
    F.join('\n'),
  )

module.exports = { part1, part2 }
