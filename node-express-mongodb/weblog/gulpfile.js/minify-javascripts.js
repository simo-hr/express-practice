var config = require('./config.js')
var del = require('del')
var gulp = require('gulp')
var uglify = require('gulp-uglify')

const { series } = require('gulp')

var minifyJavaScriptsClean = async function () {
  return del('./javascripts/**/*', { cwd: config.path.output })
}

var minifyJavaScripts = async function () {
  return gulp
    .src('./javascripts/**/*', { cwd: config.path.input })
    .pipe(uglify(config.uglify))
    .pipe(gulp.dest('./javascripts', { cwd: config.path.output }))
}

module.exports.minifyJavaScripts = series(minifyJavaScriptsClean, minifyJavaScripts)
