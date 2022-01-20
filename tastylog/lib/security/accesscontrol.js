const passport = require('passport')

const initialize = () => {
  return [
    passport.initialize(),
    passport.session(),
    (req, res, next) => {
      if (req.user) {
        res.locals.user = req.user
      }
      next()
    },
  ]
}
const authenticate = () => {}
const authorize = () => {}

module.exports = {
  initialize,
  authenticate,
  authorize,
}
