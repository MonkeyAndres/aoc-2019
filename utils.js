const fs = require('fs')
const path = require('path')

const readInput = day =>
  fs.readFileSync(path.join(__dirname, `day${day}`, 'input.txt'), {
    encoding: 'utf-8',
  })

module.exports = { readInput }
