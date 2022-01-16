const router = require('express').Router()
const moment = require('moment')
const { MySQLClient, sql } = require('../lib/database/client.js')
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
    console.log(error)
    res.render('./account/reviews/regist-form.ejs', { error, shopId, shopName, review })
    return
  }
  res.render('./account/reviews/regist-confirm.ejs', { shopId, shopName, review })
})

module.exports = router
