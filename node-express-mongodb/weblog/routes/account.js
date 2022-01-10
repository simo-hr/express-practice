const { CONNECTION_URL, OPTIONS, DATABASE } = require('../config/mongdb.config')
const { MAX_ITEM_PER_PAGE } = require('../config/app.config').search
const router = require('express').Router()
const MongoClient = require('mongodb').MongoClient

router.get('/', (req, res) => {
  res.render('../views/account/index.ejs')
})
module.exports = router
