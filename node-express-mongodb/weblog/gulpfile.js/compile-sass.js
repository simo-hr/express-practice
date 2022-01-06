var config = require('./config.js')
var del = require('del')
var gulp = require('gulp')
var sass = require('gulp-sass')(require('sass'))

const { series } = require('gulp')

var compileSassClean = async function () {
  return del('./stylesheets/**/*', { cwd: config.path.output })
}

var compileSassCopy = async function () {
  return gulp
    .src('./stylesheets/**/*.scss', { cwd: config.path.input })
    .pipe(sass(config.sass))
    .pipe(gulp.dest('./stylesheets', { cwd: config.path.output }))
}

module.exports.compileSass = series(compileSassClean, compileSassCopy)
