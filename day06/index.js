const F = require('../fp-utils')

// PART 1

const formatOrbits = (store, item) => {
  const [parent, child] = item.split(')')

  const parentOrbit = store[parent]

  if (!parentOrbit) {
    return { ...store, [parent]: [child] }
  } else {
    return { ...store, [parent]: [...store[parent], child] }
  }
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

// PART 2

const pathToCOM = (orbitMap, searchingOrbit) => {
  let parent = orbitMap[searchingOrbit]
  const acc = [parent]

  while (parent !== 'COM') {
    parent = orbitMap[parent]
    acc.push(parent)
  }

  return acc
}

const removeRepeated = (list1, list2) => {
  const filteredList1 = list1.filter(item => !list2.includes(item))
  const filteredList2 = list2.filter(item => !list1.includes(item))

  return [...filteredList1, ...filteredList2]
}

const countJumpsBetweenOrbits = (orbitA, orbitB) => orbitMap => {
  const orbitAPath = pathToCOM(orbitMap, orbitA)
  const orbitBPath = pathToCOM(orbitMap, orbitB)

  return removeRepeated(orbitAPath, orbitBPath).length
}

const part2 = F.pipe(
  F.split('\n'),
  F.reduce((store, item) => {
    const [parent, child] = item.split(')')
    return { ...store, [child]: parent }
  }, {}),
  countJumpsBetweenOrbits('YOU', 'SAN'),
)

module.exports = { part1, part2 }
