var http = require('http')

var server = http.createServer((request, response) => {
  console.log('createserver()')
})
server.on('close', () => {
  console.log('close')
})
server.on('connect', (request, socket, head) => {
  console.log('connect')
})
server.on('connection', (socket) => {
  console.log('connection')
})
server.on('request', (request, response) => {
  console.log('request')
  response.writeHead(200, { 'Content-Type': 'text/plain' })
  response.end('Hello World.')
})
server.on('upgrade', (request, socket, heade) => {
  console.log('upgrade')
})
server.listen(3000)
