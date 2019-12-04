const testDay = (day, parts) =>
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
  })

module.exports = { testDay }
