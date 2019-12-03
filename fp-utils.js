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

module.exports = {
  curry,
  pipe,
  reduce,
  split,
  map,
  updateAtIndex,
  nth,
  isNil,
  log,
}
