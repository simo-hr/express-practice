var MongoClient = require('mongodb').MongoClient

var url = 'mongodb://localhost:27017/'

// コレクションの作成
MongoClient.connect(url, (error, client) => {
  var db = client.db('sample')
  db.createCollection('test', (error, collections) => {
    client.close()
  })
})
