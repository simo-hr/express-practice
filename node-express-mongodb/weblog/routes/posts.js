const { CONNECTION_URL, OPTIONS, DATABASE } = require('../config/mongdb.config')
const router = require('express').Router()
const MongoClient = require('mongodb').MongoClient

router.get('*', (req, res) => {
  MongoClient.connect(CONNECTION_URL, OPTIONS, (error, client) => {
    const db = client.db(DATABASE)
    db.collection('posts')
      .findOne({
        url: req.url.slice(1),
      })
      .then((doc) => {
        console.log(doc)
        res.render('../views/posts/index.ejs', doc)
      })
      .catch((error) => {
        throw error
      })
      .then(() => {
        client.close()
      })
  })
})

module.exports = router
