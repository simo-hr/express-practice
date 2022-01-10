const { CONNECTION_URL, OPTIONS, DATABASE } = require('../config/mongdb.config')
const { MAX_ITEM_PER_PAGE } = require('../config/app.config').search
const router = require('express').Router()
const MongoClient = require('mongodb').MongoClient

const createRegistData = (body) => {
  const dateTime = new Date()
  return {
    url: body.url,
    published: dateTime,
    update: dateTime,
    title: body.title,
    content: body.content,
    keywords: (body.keywords || '').split(','),
    authors: (body.authors || '').split(','),
  }
}

router.get('/', (req, res) => {
  res.render('../views/account/index.ejs')
})

router.get('/posts/regist', (req, res) => {
  res.render('../views/account/posts/regist-form.ejs')
})

router.post('/posts/regist/input', (req, res) => {
  const original = createRegistData(req.body)
  res.render('../views/account/posts/regist-form.ejs', { original })
})

module.exports = router
