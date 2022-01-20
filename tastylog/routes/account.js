const router = require('express').Router()
const { authenticate, authorize, PRIVILEGE } = require('../lib/security/accesscontrol')

router.get('/', (req, res, next) => {
  res.render('./account/index.ejs')
})

router.get('/login', (req, res, next) => {
  res.render('./account/login.ejs', { message: req.flash('message') })
})

router.post('/login', authenticate())

router.use('/reviews', require('./account.reviews'))

module.exports = router
