const fs = require('fs')
process.chdir(__dirname)

fs.readFile('./sample.json', 'utf-8', (err, data) => {
  if (err) {
    console.log(err)
    return
  }

  setTimeout(() => {
    console.log('\x1b[36m%s\x1b[0m', '(6) timeout')
  })

  setImmediate(() => {
    console.log('\x1b[34m%s\x1b[0m', '(5) immediate')
  })

  process.nextTick(() => {
    console.log('\x1b[35m%s\x1b[0m', '(4) nexttick')
  })
})

setImmediate(() => {
  console.log('\x1b[34m%s\x1b[0m', '(3) immediate')
})

setTimeout(() => {
  console.log('\x1b[36m%s\x1b[0m', '(2) timeout')
})

process.nextTick(() => {
  console.log('\x1b[35m%s\x1b[0m', '(1) nexttick')
})
