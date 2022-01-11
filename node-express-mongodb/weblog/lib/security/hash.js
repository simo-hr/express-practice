const { PASSWORD_SALT, PASSWORD_STRETCH } = require('../../config/app.config').security
const crypto = require('crypto')

const digest = (text) => {
  for (let i = PASSWORD_STRETCH; i--; ) {
    const hash = crypto.createHash('sha256')
    hash.update(text)
    text = hash.digest('hex')
  }
  return text
}

module.exports = {
  digest,
}
