const IS_PRODUCTION = process.env.NODE_ENV === 'production'
const appconfig = require('./config/application.config')
const dbconfig = require('./config/mysql.config')
const path = require('path')
const logger = require('./lib/log/logger')
const accesslogger = require('./lib/log/accesslogger')
const applicationlogger = require('./lib/log/applicationlogger')
const accesscontrol = require('./lib/security/accesscontrol')
const express = require('express')
const favicon = require('serve-favicon')
const cookie = require('cookie-parser')
const session = require('express-session')
const MySQLStore = require('express-mysql-session')(session)
const flash = require('connect-flash')
const gracefulshutdown = require('http-graceful-shutdown')
const app = express()

// Express settings
app.set('view engine', 'ejs')
app.disable('x-powered-by')

// Expose global method to view engine
app.use((req, res, next) => {
  res.locals.moment = require('moment')
  res.locals.padding = require('./lib/math/math').padding
  next()
})

// Static resource rooting
app.use(favicon(path.join(__dirname, '/public/favicon.ico')))
app.use('/public', express.static(path.join(__dirname, '/public')))

// Set access log
app.use(accesslogger())

// Set middleware
app.use(cookie())
app.use(
  session({
    store: new MySQLStore({
      host: dbconfig.HOST,
      port: dbconfig.POST,
      user: dbconfig.USERNAME,
      password: dbconfig.PASSWORD,
      database: dbconfig.DATABASE,
    }),
    cookie: {
      secure: IS_PRODUCTION,
    },
    secret: appconfig.security.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    name: 'sid',
  })
)
app.use(express.urlencoded({ extended: true }))
app.use(flash())
app.use(...accesscontrol.initialize())

// Dynamic resource rooting
app.use(
  '/',
  (() => {
    const router = express.Router()
    router.use((req, res, next) => {
      res.setHeader('X-frame-Options', 'SAMEORIGIN')
      next()
    })
    router.use('/account', require('./routes/account'))
    router.use('/search', require('./routes/search'))
    router.use('/shops', require('./routes/shops'))
    router.use('/', require('./routes/index'))
    return router
  })()
)

// Custom Error page
app.use((req, res, next) => {
  res.status(404)
  res.render('./404.ejs')
})
app.use((error, req, res, next) => {
  res.status(500)
  res.render('./500.ejs')
})

// Set application log.
app.use(applicationlogger())

// Execute web application
const server = app.listen(appconfig.PORT, () => {
  logger.application.info(`Application listening at ${appconfig.PORT}`)
})

// Graceful shutdown
gracefulshutdown(server, {
  signals: 'SIGINT SIGTERM',
  timeout: 10000,
  onShutdown: () => {
    return new Promise((resolve, reject) => {
      const { pool } = require('./lib/database/pool')
      pool.end((err) => {
        if (err) {
          return reject(err)
        }
        resolve()
      })
    })
  },
  finally: () => {
    const logger = require('./lib/log/logger').application
    logger.info('Application shutdown finished.')
  },
})
