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
app.use('/', require('./routes/index.js'))
app.use('/posts/', require('./routes/posts.js'))
app.use('/search/', require('./routes/search.js'))
app.use('/account/', require('./routes/account.js'))
app.use('/api/posts', require('./api/posts'))

app.use(systemlogger())

app.listen(3000)
