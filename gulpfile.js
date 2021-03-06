var gulp        = require('gulp');
var mocha       = require('gulp-mocha');

gulp.task('test', function () {
  return gulp
    .src(['spec/config.js', 'app/**/*.spec.js'])
    .pipe(mocha({ reporter: 'min' }));
});