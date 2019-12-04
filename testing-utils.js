const F = require('./fp-utils')

const testDay = (day, parts = [], rest = F.identity) =>
  describe(`Day ${day}`, () => {
    it('works', () => {
      expect(true).toBe(true)
    })

    parts.forEach(({ fn, io, disable }, index) => {
      !disable &&
        describe(`Part ${index + 1}`, () => {
          io.forEach(({ input, output }, i) => {
            it(`expect ${i}`, () => {
              expect(fn(input)).toBe(output)
            })
          })
        })
    })

    rest()
  })

module.exports = { testDay }
