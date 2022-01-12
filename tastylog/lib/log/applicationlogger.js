const logger = require('./logger').application

module.exports = (option) => {
  return (err, req, res, next) => {
    logger.error(err.message)
    next(err)
  }
}
