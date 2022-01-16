const router = require('express').Router()
const moment = require('moment')
const { MySQLClient, sql } = require('../lib/database/client.js')
const DATE_FORMAT = 'YYYY/MM/DD'
const createReviewData = (req) => {
  const body = req.body
  let date
  return {
    shopId: req.param.shopId,
    score: parseFloat(body.score),
    visit: (date = moment(body.visit, DATE_FORMAT)) && date.isValid ? date.toDate() : null,
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

router.post('/regist/confirm', async (req, res, next) => {
  const review = createReviewData(req)
  const { shopId, shopName } = req.body
  res.render('./account/reviews/regist-confirm.ejs', { shopId, shopName, review })
})

module.exports = router
