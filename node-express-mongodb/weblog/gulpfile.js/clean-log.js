var config = require('./config.js')
var del = require('del')

const { series } = require('gulp')

var cleanLog = async function () {
  return del('./**/*', { cwd: config.path.log })
}

module.exports.cleanLog = series(cleanLog)
