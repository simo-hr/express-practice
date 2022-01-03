var MongoClient = require('mongodb').MongoClient

var url = 'mongodb://localhost:27017/sample'

var option = {
  family: 4,
  useUnifiedTopology: true,
}

MongoClient.connect(url, option, (err, client) => {
  if (err) {
    return
  }
  var db = client.db('sample')
  var bulk = db.collection('products').initializeOrderedBulkOp()
  bulk.insert({ name: 'pen', pri: 120 })
  bulk.insert({ name: 'note', pri: 120 })
  bulk.insert({ name: 'eraser', pri: 100 })
  bulk.insert({ name: 'paste', pri: 100 })
  bulk.insert({ name: 'ciseaux', pri: 320 })
  bulk.insert({ name: 'cellophane tape', pri: 80 })
  bulk.execute((err, result) => {
    client.close()
  })
})
