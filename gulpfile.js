var gulp      = require('gulp'),
    imagemin  = require('gulp-imagemin'),
    myth      = require('gulp-myth'),
    nodemon   = require('gulp-nodemon'),
    svgmin    = require('gulp-svgmin'),
    vulcanize = require('gulp-vulcanize');

gulp.task('imagemin', function () {
  gulp.src('./src/images/bitmap/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./build/images'));
});

gulp.task('myth', function () {
  gulp.src('./src/css/*.css')
    .pipe(myth())
    .pipe(gulp.dest('./build/css'));
});

gulp.task('nodemon', function () {
  nodemon({ script: 'server.js'})
    .on('start', ['imagemin', 'myth', 'svgmin', 'vulcanize'])
})

gulp.task('svgmin', function () {
  gulp.src('./src/images/svg/*.svg')
    .pipe(svgmin())
    .pipe(gulp.dest('./build/images'));
});

gulp.task('vulcanize', function () {
  gulp.src('src/html/index.html')
    .pipe(vulcanize({ dest: './', inline: false, strip: true}))
    .pipe(gulp.dest('./'));
});

gulp.task('default', ['nodemon']);