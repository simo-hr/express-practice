var http = require('http')

var server = http.createServer()
server.on('request', (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain' })
  response.write('Hello World 2.', 'utf8')
  response.end()
})
server.listen(3000)
