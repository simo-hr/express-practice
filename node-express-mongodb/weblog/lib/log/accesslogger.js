const log4js = require('log4js')
var logger = require('./logger').access

module.exports = (options) => {
  options = options || {}
  options.level = options.level || 'auto'
  return log4js.connectLogger(logger, options)
}
