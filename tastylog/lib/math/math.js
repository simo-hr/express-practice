const roundto = require('round-to')

const padding = (value) => {
  if (isNaN(parseFloat(value))) {
    return ' '
  }

  return roundto(value, 2).toPrecision(3)
}

const round = (value) => {
  return roundto(value, 2)
}

module.exports = {
  padding,
  round,
}
