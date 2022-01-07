const log4js = require('log4js')
const levels = require('log4js/lib/levels').levels
const config = require('../../config/log4js.config')
const console = log4js.getLogger()
const system = log4js.getLogger('system')
log4js.configure(config)

var ApplicationLogger = function () {
  this.logger = log4js.getLogger('application')
}
var proto = ApplicationLogger.prototype

for (var level of levels) {
  level = level.levelStr.toLowerCase()
  proto[level] = (function (level) {
    return function (key, message) {
      var logger = this.logger
      logger.addContext('key', key)
      logger[level](message)
    }
  })(level)
}
const application = new ApplicationLogger()

module.exports = {
  console,
  system,
  application,
}
