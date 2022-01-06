var gulp = require('gulp')
var config = require('./config.js')
var del = require('del')

const { series } = require('gulp')

var copyJavaScriptsClean = async function () {
  return del('./javascripts/**/*', { cwd: config.path.output })
}

var copyJavaScriptsCopy = async function () {
  return gulp
    .src('./javascripts/**/*', { cwd: config.path.input })
    .pipe(gulp.dest('./javascripts', { cwd: config.path.output }))
}

module.exports.copyJavaScripts = series(copyJavaScriptsClean, copyJavaScriptsCopy)
