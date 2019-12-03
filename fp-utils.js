const curry = fn => (...args) =>
  args.length >= fn.length ? fn(...args) : fn.bind(null, ...args)

const pipe = (...fns) => fns.reduce((acc, fn) => (...args) => fn(acc(...args)))

const reduce = curry((fn, acc, arr) => arr.reduce(fn, acc))

const split = curry((separator, item) => item.split(separator))

const map = curry((fn, arr) => arr.map(fn))

const updateAtIndex = curry((index, value, arr) => {
  const newArr = [...arr]
  newArr[index] = value
  return newArr
})

const nth = curry((index, arr) => arr[index])

const isNil = val => val === undefined || val === null

const tap = curry((fn, value) => {
  fn(value)
  return value
})

const log = tap(console.log)

const apply = curry((fn, arr) => fn(...arr))

const add = curry((a, b) => a + b)

const isObject = val => val === Object(val)

const equals = (a, b) => {
  const areArrays = Array.isArray(a) && Array.isArray(b)
  const areObjects = isObject(a) && isObject(b)

  if (areArrays && a.length === b.length) {
    return a.every((item, index) => equals(item, b[index]))
  } else if (!areArrays && areObjects) {
    return equals(Object.entries(a), Object.entries(b))
  }

  return a === b
}

module.exports = {
  curry,
  pipe,
  reduce,
  split,
  map,
  updateAtIndex,
  nth,
  isNil,
  tap,
  log,
  apply,
  add,
  equals,
}
