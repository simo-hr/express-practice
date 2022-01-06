const config = require('./config')
const { series } = require('gulp')
const { cleanLog } = require('./clean-log')
const { copyImages } = require('./copy-images')
const { copyJavaScripts } = require('./copy-javaScripts')
const { copyThirdParty } = require('./copy-third_party')
const { compileSass } = require('./compile-sass')
const { minifyJavaScripts } = require('./minify-javascripts')

config.env.IS_DEVELOPMENT
  ? (module.exports.default = series(copyThirdParty, copyImages, copyJavaScripts, compileSass))
  : (module.exports.default = series(copyThirdParty, copyImages, minifyJavaScripts, compileSass))
