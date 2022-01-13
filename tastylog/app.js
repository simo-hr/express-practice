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

// Static resource rooting
app.use(favicon(path.join(__dirname, '/public/favicon.ico')))
app.use('/public', express.static(path.join(__dirname, '/public')))

// Set access log
app.use(accesslogger())

// Dynamic resource rooting
app.use('/', require('./routes/index'))
app.use('/test', async (req, res, next) => {
  const { MySQLClient, sql } = require('./lib/database/client')
  let data
  try {
    await MySQLClient.connect()
    data = await MySQLClient.query(await sql('SELECT_SHOP_BASIC_BY_ID'))
    console.log(data)
  } catch (error) {
    next(error)
  } finally {
    await MySQLClient.end()
  }
  res.end('OK')
})

// Set application log.
app.use(applicationlogger())

// Execute web application
app.listen(PORT, () => {
  logger.application.info(`Application listening at ${PORT}`)
})
