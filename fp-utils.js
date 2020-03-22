// FUNCTION
const identity = a => a

const curry = fn => {
  return function curried(...args) {
    const done = args.length >= fn.length
    return done ? fn(...args) : (...rest) => curried(...[...args, ...rest])
  }
}

const pipe = (...fns) => fns.reduce((acc, fn) => (...args) => fn(acc(...args)))

const tap = curry((fn, value) => {
  fn(value)
  return value
})

const log = tap(console.log)

const apply = curry((fn, arr) => fn(...arr))

// LIST
const reduce = curry((fn, acc, arr) =>
  console.log({ acc, arr }) || acc === undefined
    ? arr.reduce(fn)
    : arr.reduce(fn, acc),
)

const map = curry((fn, arr) => arr.map(fn))

const filter = curry((fn, arr) => arr.filter(fn))

const updateAtIndex = curry((index, value, arr) => {
  const newArr = [...arr]
  newArr[index] = value
  return newArr
})

const nth = curry((index, arr) => arr[index])

const range = curry((from, to) => {
  const result = []

  for (let i = from; i <= to; i++) {
    result.push(i)
  }

  return result
})

const length = curry(val =>
  typeof val == 'number' ? String(val).length : Object.values(val).length,
)

const take = curry((length, list) => {
  const newList = [...list]
  newList.length = length
  return newList
})

const join = curry((separator, list) => list.join(separator))

// OBJECT
const omit = curry((keys, obj) => {
  const newObj = { ...obj }
  const safetyKeys = Array.isArray(keys) ? keys : [keys]

  for (let key of safetyKeys) {
    delete newObj[key]
  }

  return newObj
})

const prop = curry((name, obj) => obj[name])

// STRING
const split = curry((separator, item) => item.split(separator))

const occurrences = curry(
  (regexp, str) => (str.match(new RegExp(regexp, 'g')) || []).length,
)

const replace = curry((searchValue, replaceValue, list) =>
  list.replace(searchValue, replaceValue),
)

// TYPE
const isNil = val => val === undefined || val === null

const isObject = val => val === Object(val)

// RELATION
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

// LOGIC
const complement = curry((fn, val) => !fn(val))

const allPass = curry((predicates, val) => predicates.every(fn => fn(val)))

const anyPass = curry((predicates, val) => predicates.some(fn => fn(val)))

const isEmpty = pipe(length, equals(0))

const isNilOrEmpty = anyPass([isNil, isEmpty])

// MATH
const add = curry((a, b) => a + b)

module.exports = {
  identity,
  curry,
  pipe,
  reduce,
  split,
  map,
  filter,
  updateAtIndex,
  nth,
  isNil,
  isEmpty,
  isNilOrEmpty,
  tap,
  log,
  apply,
  add,
  equals,
  range,
  length,
  complement,
  allPass,
  omit,
  take,
  prop,
  occurrences,
  join,
  replace,
}
