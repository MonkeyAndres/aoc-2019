const curry = fn => (...args) =>
  args.length >= fn.length ? fn(...args) : fn.bind(null, ...args)

const pipe = (...fns) => fns.reduce((acc, fn) => (...args) => fn(acc(...args)))

const reduce = curry((fn, acc, arr) => arr.reduce(fn, acc))

const split = curry((separator, item) => item.split(separator))

const map = curry((fn, arr) => arr.map(fn))

const updateAtIndex = curry((index, value, arr) => {
  arr[index] = value
  return arr
})

const nth = curry((index, arr) => arr[index])

module.exports = { curry, pipe, reduce, split, map, updateAtIndex, nth }
