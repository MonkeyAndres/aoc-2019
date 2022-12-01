const fs = require('fs')
const path = require('path')

const INPUT_FILENAME = 'input.txt'

const readInput = day => {
  const dayFolder = `day${String(day).padStart(2, '0')}`
  const inputPath = path.join(__dirname, dayFolder, INPUT_FILENAME)

  return fs.readFileSync(inputPath, { encoding: 'utf-8' })
}

module.exports = { readInput }
