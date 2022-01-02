var gulp = require('gulp')
var concat = require('gulp-concat')
var sass = require('gulp-sass')
var rename = require('gulp-rename')

gulp.task('sass', () => {
  return gulp
    .src(['sample1.scss', 'sample2.scss'], { cwd: './src' })
    .pipe(concat('bundle.scss'))
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./dist'))
})

gulp.task('default', gulp.series('sass'))

// var gulp = require('gulp')
// var sass = require('gulp-sass')

// var scssTask = async function () {
//   return gulp
//     .src('./src/*.scss')
//     .pipe(sass({ outputStyle: 'expanded' }))
//     .pipe(gulp.dest('./dist'))
// }

// module.exports.default = scssTask
