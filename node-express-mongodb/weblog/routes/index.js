var router = require('express').Router()

router.get('/', (req, res) => {
  throw new Error('sssssssss')
  res.render('./index.ejs')
})

module.exports = router
