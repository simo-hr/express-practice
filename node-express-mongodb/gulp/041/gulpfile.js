var gulp = require("gulp");
var concat = require("gulp-concat");

var concatTask = async function () {
  return gulp.src(["sample1.txt", "sample2.txt"], { cwd: "./src" })
    .pipe(concat("bundle.js"))
    .pipe(gulp.dest("./dist"));
};

module.exports.default = concatTask;

// var gulp = require("gulp");
// var rename = require("gulp-rename");

// var renameTask = async function () {
//   return gulp.src("./src/sample1.txt")
//     .pipe(rename({ suffix: ".min" }))
//     .pipe(gulp.dest("./dist"));
// };

// module.exports.default = renameTask;

// var gulp = require("gulp");
// var del = require("del");

// var deleteTask = async function () {
//   return del("./dist/*");
// };

// module.exports.default = deleteTask;

// var gulp = require("gulp");

// var copyTask = async function () {
//   return gulp.src("./src/sample1.txt")
//     .pipe(gulp.dest("./dist"));
// };

// module.exports.default = copyTask;