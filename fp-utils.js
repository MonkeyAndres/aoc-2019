const curry = fn => (...args) =>
  args.length >= fn.length ? fn(...args) : fn.bind(null, ...args)

const pipe = (...fns) => fns.reduce((acc, fn) => (...args) => fn(acc(...args)))

const reduce = curry((fn, acc, arr) => arr.reduce(fn, acc))

const split = curry((separator, item) => item.split(separator))

module.exports = { curry, pipe, reduce, split }
