const router = require('express').Router()
const { authenticate, authorize, PRIVILEGE } = require('../lib/security/accesscontrol')
const { MySQLClient, sql } = require('../lib/database/client.js')
const { digest } = require('../lib/security/hash')
const validateUserData = (req) => {
  let error = {}
  let isValid = true

  // Check email
  const emailReg = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}.[A-Za-z0-9]{1,}$/
  if (!emailReg.test(req.body.email)) {
    isValid = false
    error.email = 'メールアドレスが正しくありません。'
  }

  if (req.body.password.length < 6) {
    isValid = false
    error.password = 'パスワードは6文字以上で登録してください。'
  }

  if (isValid) {
    error = undefined
  }
  return error
}

const createUserData = (req) => {
  return {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  }
}

router.get('/', authorize(PRIVILEGE.NORMAL), (req, res, next) => {
  res.render('./account/index.ejs')
})

router.get('/login', (req, res, next) => {
  res.render('./account/login.ejs', { message: req.flash('message') })
})

router.post('/login', authenticate())

router.post('/logout', (req, res, next) => {
  req.logOut()
  res.redirect('/account/login')
})

router.get('/register', (req, res, next) => {
  const user = createUserData(req)
  res.render('./account/register-form.ejs', { user })
})

router.post('/register/confirm', (req, res, next) => {
  const error = validateUserData(req)
  const user = createUserData(req)
  if (error) {
    res.render('./account/register-form.ejs', { error, user })
    return
  }

  res.render('./account/register-confirm.ejs', { user })
})

router.post('/register/execute', async (req, res, next) => {
  const error = validateUserData(req)
  const user = createUserData(req)
  if (error) {
    res.render('./account/register-form.ejs', { error, user })
    return
  }

  try {
    user.password = digest(user.password)
    await MySQLClient.executeQuery(await sql('INSERT_USER'), [user.name, user.email, user.password])
    res.redirect('/account/register/complete')
  } catch (error) {
    next(error)
    return
  }
})

router.get('/register/complete', (req, res, next) => {
  res.render('./account/register-complete.ejs')
})

router.use('/reviews', authorize(PRIVILEGE.NORMAL), require('./account.reviews'))

module.exports = router
