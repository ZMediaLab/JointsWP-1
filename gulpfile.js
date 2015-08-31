// Grab our gulp packages
var gulp  = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    plumber = require('gulp-plumber'),
    bower = require('gulp-bower')
    
// Compile Sass, Autoprefix and minify
gulp.task('styles', function() {
  return gulp.src('./assets/scss/**/*.scss')
    .pipe(plumber(function(error) {
            gutil.log(gutil.colors.red(error.message));
            this.emit('end');
    }))
    .pipe(sass())
    .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
    .pipe(gulp.dest('./assets/css/'))     
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('./assets/css/'))
});    
    
// JSHint, concat, and minify JavaScript
gulp.task('scripts', function() {
  return gulp.src([	
           // Grab your custom scripts
  		  './assets/js/scripts/*.js'
  ])
    .pipe(plumber())
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('./assets/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('./assets/js'))
});    

// JSHint, concat, and minify JavaScript
gulp.task('foundation-js', function() {
  return gulp.src([	
  		  
  		  // Foundation core - needed if you want to use any of the components below
          './vendor/foundation/js/foundation/foundation.js',
          
          // Pick the componenets you need in your project
          './vendor/foundation/js/foundation/foundation.abide.js',
          './vendor/foundation/js/foundation/foundation.accordion.js',
          './vendor/foundation/js/foundation/foundation.alert.js',
          './vendor/foundation/js/foundation/foundation.clearing.js',
          './vendor/foundation/js/foundation/foundation.dropdown.js',
          './vendor/foundation/js/foundation/foundation.equalizer.js',
          './vendor/foundation/js/foundation/foundation.interchange.js',
          './vendor/foundation/js/foundation/foundation.joyride.js',
          './vendor/foundation/js/foundation/foundation.magellan.js',
          './vendor/foundation/js/foundation/foundation.offcanvas.js',
          './vendor/foundation/js/foundation/foundation.orbit.js',
          './vendor/foundation/js/foundation/foundation.reveal.js',
          './vendor/foundation/js/foundation/foundation.slider.js',
          './vendor/foundation/js/foundation/foundation.tab.js',
          './vendor/foundation/js/foundation/foundation.tooltip.js',
          './vendor/foundation/js/foundation/foundation.topbar.js',      
  ])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(concat('foundation.js'))
    .pipe(gulp.dest('./assets/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('./assets/js'))
});

// Update Foundation with Bower and save to /vendor
gulp.task('bower', function() {
  return bower({ cmd: 'update'})
    .pipe(gulp.dest('vendor/'))
});    

// Create a default task 
gulp.task('default', function() {
  gulp.start('styles', 'scripts', 'foundation-js');
});

// Watch files for changes
gulp.task('watch', function() {

  // Watch .scss files
  gulp.watch('./assets/scss/**/*.scss', ['styles']);

  // Watch site-js files
  gulp.watch('./assets/js/site/*.js', ['scripts']);
  
  // Watch foundation-js files
  gulp.watch('./vendor/foundation/js/foundation/*.js', ['foundation-js']);

});
