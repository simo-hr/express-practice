const { CONNECTION_URL, OPTIONS, DATABASE } = require('../config/mongodb.config')
const { authenticate, authorize } = require('../lib/security/accountcontrol')
const router = require('express').Router()
const MongoClient = require('mongodb').MongoClient
const tokens = new require('csrf')()

const validateRegistData = function (body) {
  let isValidated = true
  const errors = {}

  if (!body.url) {
    isValidated = false
    errors.url = "URLが未入力です。'/'から始まるURLを入力してください。"
  }

  if (body.url && /^\//.test(body.url) === false) {
    isValidated = false
    errors.url = "'/'から始まるURLを入力してください。"
  }

  if (!body.title) {
    isValidated = false
    errors.title = 'タイトルが未入力です。任意のタイトルを入力してください。'
  }

  return isValidated ? undefined : errors
}

const createRegistData = function (body) {
  const dateTime = new Date()
  return {
    url: body.url,
    published: dateTime,
    updated: dateTime,
    title: body.title,
    content: body.content,
    keywords: (body.keywords || '').split(','),
    authors: (body.authors || '').split(','),
  }
}

router.get('/', authorize('readWrite'), (req, res) => {
  res.render('./account/index.ejs')
})

router.get('/login', (req, res) => {
  res.render('./account/login.ejs', { message: req.flash('message') })
})

router.post('/logout', (req, res) => {
  req.logOut()
  res.redirect('/account/login')
})

router.post('/login', authenticate())

router.get('/posts/regist', authorize('readWrite'), (req, res) => {
  tokens.secret((error, secret) => {
    const token = tokens.create(secret)
    req.session._csrf = secret
    res.cookie('_csrf', token)
    res.render('./account/posts/regist-form.ejs')
  })
})

router.post('/posts/regist/input', authorize('readWrite'), (req, res) => {
  const original = createRegistData(req.body)
  res.render('./account/posts/regist-form.ejs', { original })
})

router.post('/posts/regist/confirm', authorize('readWrite'), (req, res) => {
  const original = createRegistData(req.body)
  const errors = validateRegistData(req.body)
  if (errors) {
    res.render('./account/posts/regist-form.ejs', { errors, original })
    return
  }
  res.render('./account/posts/regist-confirm.ejs', { original })
})

router.post('/posts/regist/execute', authorize('readWrite'), (req, res) => {
  const secret = req.session._csrf
  const token = req.cookies._csrf
  if (tokens.verify(secret, token) === false) {
    throw new Error('Invalid Token.')
  }
  const original = createRegistData(req.body)
  const errors = validateRegistData(req.body)
  if (errors) {
    res.render('./account/posts/regist-form.ejs', { errors, original })
    return
  }
  MongoClient.connect(CONNECTION_URL, OPTIONS, (errors, client) => {
    const db = client.db(DATABASE)
    original.url = original.url.slice(1)
    db.collection('posts')
      .insertOne(original)
      .then(() => {
        delete req.session._csrf
        res.clearCookie('_csrf')
        res.redirect('/account/posts/regist/complete')
      })
      .catch((error) => {
        throw error
      })
      .then(() => {
        client.close()
      })
  })
})

router.get('/posts/regist/complete', (req, res) => {
  res.render('./account/posts/regist-complete.ejs')
})

module.exports = router
