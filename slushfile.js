var gulp     = require('gulp'),
    install  = require('gulp-install'),
    template = require('gulp-template'),
    inquirer = require('inquirer');

gulp.task('default', function (done) {

  inquirer.prompt([
    {type: 'input', name: 'name', message: 'Give your project a name', default: "my-project"},
    {type: 'input', name: 'title', message: 'Give your project a title', default: "My Project"}, 
    {type: 'input', name: 'namespace', message: 'Namespace of the project', default: "NS"}, // Get app name from arguments by default
    {type: 'input', name: 'description', message: 'Give your project a description', default:"Best project ever"}, // Get app name from arguments by default,
    {type: 'confirm', name: 'moveon', message: 'Continue?'}
  ],

  function (answers) {
    if (!answers.moveon) {
      return done();
    }
    gulp.src(__dirname + '/root/**')  // Note use of __dirname to be relative to generator
      .pipe(template(answers))        // Lodash template support
      .pipe(gulp.dest('./'))          // Without __dirname here = relative to cwd
      .pipe(install())                // Run `bower install` and/or `npm install` if necessary
      .on('finish', function () {
        done();                       // Finished!
      });
  });

});