var http = require('http')

http
  .createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/plain' })
    response.end('Hello World 1.')
  })
  .listen(3000)
