const router = require('express').Router()
const { MySQLClient, sql } = require('../lib/database/client.js')

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

module.exports = router
