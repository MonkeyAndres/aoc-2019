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

const pathToCOM = (orbitMap, searchingOrbit) => {
  let parent = orbitMap[searchingOrbit]
  const acc = [parent]

  while (parent !== 'COM') {
    parent = orbitMap[parent]
    acc.push(parent)
  }

  return acc
}

const part1 = F.pipe(
  F.split('\n'),
  F.reduce(formatOrbits, {}),
  recursiveCountOrbits,
)

const part2 = F.pipe(
  F.split('\n'),
  F.reduce((store, item) => {
    const [parent, child] = item.split(')')
    return { ...store, [child]: parent }
  }, {}),
  orbitMap => {
    const youPath = pathToCOM(orbitMap, 'YOU')
    const santaPath = pathToCOM(orbitMap, 'SAN')

    const filteredYou = youPath.filter(item => !santaPath.includes(item))
    const filteredSan = santaPath.filter(item => !youPath.includes(item))

    return filteredYou.length + filteredSan.length
  },
)

module.exports = { part1, part2 }
