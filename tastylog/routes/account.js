const router = require('express').Router()

router.use('/login', (req, res, next) => {
  res.render('./account/login.ejs')
})

router.use('/reviews', require('./account.reviews'))

module.exports = router
