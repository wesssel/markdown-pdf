var 
    angular = require('gulp-ng-annotate'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    gulp = require('gulp'),
    iife = require("gulp-iife"),
    minifycss = require('gulp-minify-css'),
    nodemon = require('gulp-nodemon'),
    reload = browserSync.reload,
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify');

var BROWSER_SYNC_RELOAD_DELAY = 500;

/* Compile Sass */
gulp.task('sass', function() {
	return gulp.src('./client/app/scss/*.scss')
		.pipe(sass({includePaths: ['bower_components/foundation/scss']}))
		.pipe(rename({suffix: '.min'}))
		.pipe(minifycss())
		.pipe(gulp.dest('./client/css'));
});

/* Compress modules */
gulp.task('vendor', function(){
    return gulp.src([
            'bower_components/angular/angular.js',
            'bower_components/angular-ui-router/release/angular-ui-router.min.js',
            'bower_components/angular-sanitize/angular-sanitize.min.js',
            'bower_components/wiz-markdown/wizMarkdown/wizMarkdown.min.js',
        ])
        .pipe(concat('vendor.min.js'))
        .pipe(gulp.dest('client/js'));
});

/* Compress modules */
gulp.task('modules', function(){
    return gulp.src([
            'client/app/modules/**/*.js'
        ])
        .pipe(iife({
            useStrict: false
        }))
        .pipe(concat('app.min.js'))
		.pipe(angular())
        //.pipe(uglify())
        .pipe(gulp.dest('client/js'));
});

/* Nodemon */
gulp.task('nodemon', function (cb) {
  var called = false;
  return nodemon({
    script: 'bin/www',
    ignore: [
      'gulpfile.js',
      'node_modules/'
    ]
  })
  .on('start', function onStart() {
      // ensure start only got called once
      if (!called) { cb(); }
      called = true;
  })
  .on('restart', function onRestart() {
      // reload connected browsers after a slight delay
      setTimeout(function reload() {
        browserSync.reload({
          stream: false  
        });
      }, BROWSER_SYNC_RELOAD_DELAY);
  });
});

/* Browser Sync */
gulp.task('browser-sync', ['nodemon'], function() {
  var files = [
    'server/**/*.*',
    'client/**/*.*'
    ];
  browserSync.init(files, {
    proxy: "localhost:7000",  // local node app address
    port: 8000,  // use *different* port than above
    notify: true
  });
});

gulp.task('default', ['sass', 'vendor', 'modules', 'browser-sync'], function() {
	gulp.watch('client/scss/*.scss', ['sass']);
	gulp.watch('client/app/modules/**/*.js', ['modules']);
});
