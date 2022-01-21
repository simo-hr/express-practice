const { ACCOUNT_LOCK_WINDOW, ACCOUNT_LOCK_THRESHOLD, ACCOUNT_LOCK_TIME, MAX_LOGIN_HISTORY } =
  require('../../config/application.config').security
const moment = require('moment')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const { MySQLClient, sql } = require('../database/client')
const PRIVILEGE = {
  NORMAL: 'normal',
}
const LOGIN_STATUS = {
  SUCCESS: 0,
  FAILURE: 1,
}
passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  done(null, user)
})

passport.use(
  'local-strategy',
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      let results, user, transaction
      const now = new Date()

      try {
        transaction = await MySQLClient.beginTransaction()
        // Get user info
        results = await transaction.executeQuery(await sql('SELECT_USER_BY_EMAIL_FOR_UPDATE'), [username])

        if (results.length !== 1) {
          transaction.commit()
          return done(null, false, req.flash('message', 'ユーザー名 または パスワードが間違っています。'))
        }

        user = {
          id: results[0].id,
          name: results[0].name,
          email: results[0].email,
          permissions: [PRIVILEGE.NORMAL],
        }

        // Check account lock status
        if (
          results[0].locked &&
          moment(now).isSameOrBefore(moment(results[0].locked).add(ACCOUNT_LOCK_TIME, 'minutes'))
        ) {
          transaction.commit()
          return done(null, false, req.flash('message', 'アカウントがロックされています。'))
        }

        // Delete old login log
        await transaction.executeQuery(await sql('DELETE_LOGIN_HISTORY'), [user.id, user.id, MAX_LOGIN_HISTORY - 1])

        // Compare password
        if (password !== results[0].password) {
          // Insert login log
          await transaction.executeQuery(await sql('INSERT_LOGIN_HISTORY'), [user.id, now, LOGIN_STATUS.FAILURE])

          // Lock account, if need
          let tmp = await transaction.executeQuery(await sql('COUNT_LOGIN_HISTORY'), [
            user.id,
            moment(now).subtract(ACCOUNT_LOCK_WINDOW, 'minutes').toDate(),
            LOGIN_STATUS.FAILURE,
          ])
          const count = (tmp || [])[0].count
          if (count >= ACCOUNT_LOCK_THRESHOLD) {
            await transaction.executeQuery(await sql('UPDATE_USER_LOCKED'), [now, user.id])
          }
          transaction.commit()
          return done(null, false, req.flash('message', 'ユーザー名 または パスワードが間違っています。'))
        }

        // Insert login log
        await transaction.executeQuery(await sql('INSERT_LOGIN_HISTORY'), [user.id, now, LOGIN_STATUS.SUCCESS])

        // Unlock account
        await transaction.executeQuery(await sql('UPDATE_USER_LOCKED'), [null, user.id])
        transaction.commit()
      } catch (error) {
        transaction.rollback()
        return done(error)
      }

      // Session regenerate
      req.session.regenerate((error) => {
        if (error) {
          done(error)
        } else {
          done(null, user)
        }
      })
    }
  )
)

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

const authenticate = () => {
  return passport.authenticate('local-strategy', {
    successRedirect: '/account',
    failureRedirect: '/account/login',
  })
}

const authorize = (privilege) => {
  return (req, res, next) => {
    if (req.isAuthenticated() && (req.user.permissions || []).indexOf(privilege) >= 0) {
      next()
    } else {
      res.redirect('/account/login')
    }
  }
}

module.exports = {
  initialize,
  authenticate,
  authorize,
  PRIVILEGE,
}
