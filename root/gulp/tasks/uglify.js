var gulp      = require('gulp'),
    uglifyJS  = require('gulp-uglify');

gulp.task('uglify', function() {
  gulp.src('./app/js/app.js')
  //.pipe(rename({ suffix: '.min' }))
  .pipe(uglifyJS())
  .pipe(gulp.dest('dist/js'));
});