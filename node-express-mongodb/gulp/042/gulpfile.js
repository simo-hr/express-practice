var gulp = require("gulp");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");

var minifyTask = async function () {
  return gulp.src(["sample1.js", "sample2.js"], { cwd: "./src" })
    .pipe(concat("bundle.js"))
    .pipe(uglify())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("./dist"));
};

module.exports.default = minifyTask;

// var gulp = require("gulp");
// var uglify = require("gulp-uglify");

// var minifyTask = async function () {
//   return gulp.src("sample1.js", { cwd: "./src" })
//     .pipe(uglify())
//     .pipe(gulp.dest("./dist"));
// };

// module.exports.default = minifyTask;