const router = require('express').Router()
const moment = require('moment')
const { MySQLClient, sql } = require('../lib/database/client.js')
const tokens = new (require('csrf'))()
const DATE_FORMAT = 'YYYY/MM/DD'

const validateReviewData = (req) => {
  const body = req.body
  let isValid = true
  const error = {}

  if (body.visit && !moment(body.visit, DATE_FORMAT).isValid()) {
    isValid = false
    error.visit = '訪問日の日付文字列が不正です。'
  }

  if (isValid) {
    return undefined
  }
  return error
}

const createReviewData = (req) => {
  const body = req.body
  let date
  return {
    shopId: req.param.shopId,
    score: parseFloat(body.score),
    visit: (date = moment(body.visit, DATE_FORMAT)) && date.isValid() ? date.toDate() : null,
    post: new Date(),
    description: body.description,
  }
}

router.get('/regist/:shopId(\\d+)', async (req, res, next) => {
  const shopId = req.params.shopId
  let results
  let review
  let shopName

  const secret = await tokens.secret()
  const token = tokens.create(secret)
  req.session._csrf = secret
  res.cookie('_csrf', token)

  try {
    results = await MySQLClient.executeQuery(await sql('SELECT_SHOP_BASIC_BY_ID'), [shopId])
    const shop = results[0] || {}
    shopName = shop.name
    review = {}
    res.render('./account/reviews/regist-form.ejs', {
      shopId,
      shopName,
      review,
    })
  } catch (error) {
    next(error)
  }
})

router.post('/regist/:shopId(\\d+)', async (req, res, next) => {
  const review = createReviewData(req)
  const { shopId, shopName } = req.body
  res.render('./account/reviews/regist-form.ejs', { shopId, shopName, review })
})

router.post('/regist/confirm', async (req, res, next) => {
  const error = validateReviewData(req)
  const review = createReviewData(req)
  const { shopId, shopName } = req.body

  if (error) {
    res.render('./account/reviews/regist-form.ejs', { error, shopId, shopName, review })
    return
  }
  res.render('./account/reviews/regist-confirm.ejs', { shopId, shopName, review })
})

router.post('/regist/execute', async (req, res, next) => {
  const secret = req.session._csrf
  const token = req.cookies._csrf

  if (tokens.verify(secret, token) === false) {
    next(new Error('Invalid Token.'))
    return
  }

  const error = validateReviewData(req)
  const review = createReviewData(req)
  const { shopId, shopName } = req.body
  const userId = 1 // TODO:ログイン機能実装後に更新
  let transaction
  if (error) {
    res.render('./account/reviews/regist-form.ejs', { error, shopId, shopName, review })
    return
  }

  try {
    transaction = await MySQLClient.beginTransaction()
    transaction.executeQuery(await sql('SELECT_SHOP_BY_ID_FOR_UPDATE'), [shopId])
    transaction.executeQuery(await sql('INSERT_SHOP_REVIEW'), [
      shopId,
      userId,
      review.score,
      review.visit,
      review.description,
    ])
    transaction.executeQuery(await sql('UPDATE_SHOP_SCORE_BY_ID'), [shopId, shopId])
    await transaction.commit()
  } catch (error) {
    await transaction.rollback()
    next(error)
    return
  }
  delete req.session._csrf
  res.clearCookie('_csrf')
  res.render('./account/reviews/regist-complete', { shopId })
})

module.exports = router
