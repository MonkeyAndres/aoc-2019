const F = require('./fp-utils')

const testDay = (day, parts = [], rest = F.identity) =>
  describe(`Day ${day}`, () => {
    it('works', () => {
      expect(true).toBe(true)
    })

    parts.forEach(({ name, fn, io, disable }, index) => {
      if (disable) {
        return
      }

      const testName = name || `Misc test #${index} for day ${day}.`

      describe(testName, () => {
        io.forEach(({ input, output }) => {
          it(`expect ${JSON.stringify(output)}`, () => {
            expect(fn(input)).toStrictEqual(output)
          })
        })
      })
    })

    rest()
  })

module.exports = { testDay }
