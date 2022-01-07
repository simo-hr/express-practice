const log4js = require('log4js')
const config = require('../../config/log4js.config')
const console = log4js.getLogger()
const system = log4js.getLogger('system')
log4js.configure(config)

module.exports = {
  console,
  system,
}
