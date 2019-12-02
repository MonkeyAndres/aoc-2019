const testDay = (day, parts) =>
  describe(`Day ${day}`, () => {
    parts.forEach(({ fn, io }, index) => {
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
