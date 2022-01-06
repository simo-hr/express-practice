var gulp = require('gulp')
var config = require('./config.js')
var del = require('del')

const { series } = require('gulp')

var copyThirdPartyClean = async function () {
  return del('./third_party/**/*', { cwd: config.path.output })
}

// jquery, popper.js, bootstrap, font-awesome
var copyThirdPartyCopyJquery = async function () {
  return gulp
    .src('./jquery/dist/**/*', { cwd: config.path.node_modules })
    .pipe(gulp.dest('./third_party/jquery', { cwd: config.path.output }))
}
var copyThirdPartyCopyPopperJs = async function () {
  return gulp
    .src('./popper.js/dist/**/*', { cwd: config.path.node_modules })
    .pipe(gulp.dest('./third_party/popper.js', { cwd: config.path.output }))
}
var copyThirdPartyCopyBootstrap = async function () {
  return gulp
    .src('./bootstrap/dist/**/*', { cwd: config.path.node_modules })
    .pipe(gulp.dest('./third_party/bootstrap', { cwd: config.path.output }))
}
var copyThirdPartyCopyFontAwesome = async function () {
  return gulp
    .src('./font-awesome/**/*', { cwd: config.path.node_modules })
    .pipe(gulp.dest('./third_party/font-awesome', { cwd: config.path.output }))
}

module.exports.copyThirdParty = series(
  copyThirdPartyClean,
  copyThirdPartyCopyJquery,
  copyThirdPartyCopyPopperJs,
  copyThirdPartyCopyBootstrap,
  copyThirdPartyCopyFontAwesome
)
