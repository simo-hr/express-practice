var accesslogger = require('./lib/log/accesslogger.js')
var systemlogger = require('./lib/log/systemlogger.js')
const accountControl = require('./lib/security/accountcontrol')
var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var cookieParser = require('cookie-parser')
var session = require('express-session')
var flash = require('connect-flash')
var { SESSION_SECRET } = require('./config/app.config').security
app.set('view engine', 'ejs')
app.disable('x-powered-by')

app.use(
  '/public',
  express.static(__dirname + '/public/' + (process.env.NODE_ENV === 'development' ? 'development' : 'production'))
)

app.use(accesslogger())

app.use(cookieParser())
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    name: 'sid',
  })
)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(flash())
app.use(...accountControl.initialize())

app.use(
  '/api',
  (() => {
    const router = express.Router()
    router.use('/posts', require('./api/posts'))
    return router
  })()
)

app.use(
  '/',
  (() => {
    const router = express.Router()
    router.use((req, res, next) => {
      res.setHeader('X-Frame-Options', 'SAMEORIGIN')
      next()
    })
    router.use('/posts/', require('./routes/posts.js'))
    router.use('/search/', require('./routes/search.js'))
    router.use('/account/', require('./routes/account.js'))
    router.use('/', require('./routes/index.js'))
    return router
  })()
)

app.use(systemlogger())

app.listen(3000)
