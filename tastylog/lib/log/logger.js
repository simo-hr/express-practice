const log4js = require('log4js')
const config = require('../../config/log4js.config')

log4js.configure(config)

// Console Logger
const console = log4js.getLogger()

// Application Logger
const application = log4js.getLogger('application')

// Access Logger
const access = log4js.getLogger('access')

module.exports = {
  console,
  application,
  access,
}
