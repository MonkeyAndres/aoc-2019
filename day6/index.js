const F = require('../fp-utils')

const formatOrbits = (store, item) => {
  const _store = { ...store }
  const [parent, child] = item.split(')')

  const parentOrbit = _store[parent]

  if (!parentOrbit) {
    _store[parent] = [child]
  } else {
    parentOrbit.push(child)
  }

  return _store
}

const recursiveCountOrbits = (store, center = 'COM', depth = 1) => {
  const orbiting = store[center]

  if (!orbiting) {
    return 0
  }

  return (
    orbiting.length * depth +
    orbiting.reduce(
      (acc, newCenter) =>
        acc + recursiveCountOrbits(store, newCenter, depth + 1),
      0,
    )
  )
}

const part1 = F.pipe(
  F.split('\n'),
  F.reduce(formatOrbits, {}),
  recursiveCountOrbits,
)

module.exports = { part1 }
