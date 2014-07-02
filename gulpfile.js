var gulp      = require('gulp');
var imagemin  = require('gulp-imagemin');
var myth      = require('gulp-myth');
var nodemon   = require('gulp-nodemon');
var svgmin    = require('gulp-svgmin');
var vulcanize = require('gulp-vulcanize');

var tasks = [
  'imagemin',
  'myth',
  'svgmin',
  'vulcanize'
];

gulp.task('imagemin', function () {
  return gulp.src('./src/images/bitmap/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./build/images'));
});

gulp.task('myth', function () {
  return gulp.src('./src/css/*.css')
    .pipe(myth())
    .pipe(gulp.dest('./build/css'));
});

gulp.task('nodemon', function () {
  return nodemon({ script: 'index.js'})
    .on('start', tasks)
    .on('change', tasks);
})

gulp.task('svgmin', function () {
  return gulp.src('./src/images/svg/*.svg')
    .pipe(svgmin())
    .pipe(gulp.dest('./build/images'));
});

gulp.task('vulcanize', function () {
  return gulp.src('src/html/index.html')
    .pipe(vulcanize({ dest: './', inline: false, strip: true}))
    .pipe(gulp.dest('./'));
});

gulp.task('default', ['nodemon']);