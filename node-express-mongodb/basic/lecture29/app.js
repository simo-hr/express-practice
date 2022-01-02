var express = require('express')
var app = express()

app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  var data = {
    items: [{ name: '<b>佐藤</b>' }, { name: '鈴木' }, { name: '高橋' }],
  }
  res.render('./index.ejs', data)
})

app.listen(3000)
