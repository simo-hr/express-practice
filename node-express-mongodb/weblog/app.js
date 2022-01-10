const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const systemlogger = require('./lib/log/systemlogger')
const accesslogger = require('./lib/log/accesslogger')

app.set('view engine', 'ejs')
app.disable('x-powered-by')

app.use(
  '/public',
  express.static(__dirname + '/public/' + (process.env.NODE_ENV === 'development' ? 'development' : 'production'))
)

// 静的ファイルへのアクセスログはいらないのでここに配置
app.use(accesslogger())

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/posts/', require('./routes/posts'))
app.use('/search/', require('./routes/search'))
app.use('/account/', require('./routes/account'))

app.use('/', require('./routes/index.js'))
app.use(systemlogger())
app.listen(3000)
