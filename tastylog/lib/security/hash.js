const { PASSWORD_STRETCH } = require('../../config/application.config').security
const bcrypt = require('bcrypt')

const digest = (text) => {
  const salt = bcrypt.genSaltSync(PASSWORD_STRETCH)
  return bcrypt.hashSync(text, salt)
}

module.exports = {
  digest,
}
