var express = require('express')
var app = express()

app.use('/public', express.static(__dirname + '/public'))

app.listen(3000)
