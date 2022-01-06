var gulp = require('gulp')
var config = require('./config.js')
var del = require('del')

const { series } = require('gulp')

var copyImagesClean = async function () {
  return del('./images/**/*', { cwd: config.path.output })
}

var copyImagesCopy = async function () {
  return gulp.src('./images/**/*', { cwd: config.path.input }).pipe(gulp.dest('./images', { cwd: config.path.output }))
}

module.exports.copyImages = series(copyImagesClean, copyImagesCopy)
