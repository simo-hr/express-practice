const PORT = process.env.PORT
const path = require('path')
const logger = require('./lib/log/logger')
const express = require('express')
const favicon = require('serve-favicon')
const app = express()

// Express settings
app.set('view engine', 'ejs')
app.disable('x-powered-by')

// Static resource rooting
app.use(favicon(path.join(__dirname, '/public/favicon.ico')))
app.use('/public', express.static(path.join(__dirname, '/public')))

// Dynamic resource rooting
app.use('/', require('./routes/index'))

// Execute web application
app.listen(PORT, () => {
  logger.console.info(`Application listening at ${PORT}`)
})