const gulp = require("gulp");
const { src, dest, watch, parallel, series } = require("gulp")

/////////////////////////////////////////////////////////////////image
const imagemin = require('gulp-imagemin');
function image() {
    return gulp.src('task/pics/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'));
}
exports.img = image
/////////////////////////////////////////////////////////////////html

const htmlmin = require('gulp-htmlmin');
function Html() {
    return src('task/*.html')
        .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
        .pipe(gulp.dest('dist'))
}

exports.html = Html

/////////////////////////////////////////////////////////////////css
var cleanCss = require('gulp-clean-css');
function Css() {
    return src("task/css/**/*.css")
        .pipe(cleanCss())
        .pipe(dest('dist/assets/css'))
}
exports.css = Css
/////////////////////////////////////////////////////////////////sass
const sass = require('gulp-sass')(require('sass'));
function sassMinify() {
    return src(["task/sass/**/*.scss", "task/css/**/*.css"],{sourcemaps:true})
        .pipe(sass()) 
        .pipe(cleanCss())
        .pipe(dest('dist/assets/css',{sourcemaps:'.'}))
}

///////////////////////////////////////////////////////////////// browsersync
var browserSync = require('browser-sync');
function serve (cb){
  browserSync({
    server: {
      baseDir: 'dist/'
    }
  });
  cb()
}
/////////////////////////////////////////////////////////////////load
function reloadTask(done) {
  browserSync.reload()
  done()
}

///////////////////////////////////////////////////////////////// watch 
function watchTask() {
    watch('task/*.html',series(Html, reloadTask))
    watch(["task/css/**/*.css","task/sass/**/*.scss"], series(sassMinify,reloadTask));
}
exports.default = series( parallel(image, sassMinify, Html), serve,watchTask)




