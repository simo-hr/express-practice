const PORT = process.env.PORT
const path = require('path')
const logger = require('./lib/log/logger')
const accesslogger = require('./lib/log/accesslogger')
const applicationlogger = require('./lib/log/applicationlogger')
const express = require('express')
const favicon = require('serve-favicon')
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

// Dynamic resource rooting
app.use('/search', require('./routes/search'))
app.use('/shops', require('./routes/shops'))
app.use('/', require('./routes/index'))

// Set application log.
app.use(applicationlogger())

// Execute web application
app.listen(PORT, () => {
  logger.application.info(`Application listening at ${PORT}`)
})
