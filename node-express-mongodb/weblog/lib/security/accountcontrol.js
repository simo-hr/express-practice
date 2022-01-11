const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const MongoClient = require('mongodb').MongoClient
const { CONNECTION_URL, OPTIONS, DATABASE } = require('../../config/mongodb.config')

passport.serializeUser((email, done) => {
  done(null, email)
})

passport.deserializeUser((email, done) => {
  MongoClient.connect(CONNECTION_URL, OPTIONS, (error, client) => {
    const db = client.db(DATABASE)
    db.collection('users')
      .findOne({ email })
      .then((user) => {
        done(null, user)
      })
      .catch((error) => {
        done(error)
      })
      .then(() => {
        client.close()
      })
  })
})

passport.use(
  'local-strategy',
  new localStrategy(
    {
      usernameField: '',
      passwordField: '',
      passReqToCallback: true,
    },
    (req, username, password, done) => {
      MongoClient.connect(CONNECTION_URL, OPTIONS, (error, client) => {
        const db = client.db(DATABASE)
        db.collection('users')
          .findOne({
            email: username,
            password: password,
          })
          .then((user) => {
            if (user) {
              req.session.regenerate((error) => {
                if (error) {
                  done(error)
                }
                done(null, user.email)
              })
            } else {
              done(null, false, req.flash('message', 'ユーザー名 または パスワード が間違っています。'))
            }
          })
          .catch((error) => {})
          .then(() => {
            client.close()
          })
      })
    }
  )
)
const initialize = () => {
  return [passport.initialize(), passport.session()]
}

const authenticate = () => {
  return passport.authenticate('local-strategy', {
    successRedirect: '/account/',
    failureRedirect: '/account/login',
  })
}

const authorize = () => {}

module.exports = { initialize, authenticate, authorize }
