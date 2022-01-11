const router = require('express').Router()
const { CONNECTION_URL, OPTIONS, DATABASE } = require('../config/mongodb.config')
const { MAX_ITEM_PER_PAGE } = require('../config/app.config').search
const MongoClient = require('mongodb').MongoClient

router.get('/*', (req, res) => {
  MongoClient.connect(CONNECTION_URL, OPTIONS, (error, client) => {
    const db = client.db(DATABASE)
    db.collection('posts')
      .findOne({ url: req.url.slice(1) }, { projection: { _id: 0 } })
      .then((doc) => {
        res.json(doc)
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
