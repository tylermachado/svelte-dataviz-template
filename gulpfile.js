var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var del = require('del');
var runSequence = require('run-sequence');
var fileinclude = require('gulp-file-include');
var notify = require('gulp-notify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var strip = require('gulp-strip-comments');
var htmlbeautify = require('gulp-html-beautify');
var autoprefixer = require('gulp-autoprefixer');
var csv2json = require('gulp-csv-to-json');

gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss
    .pipe(concat('styles.scss'))
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(autoprefixer({
      safe: true,
      add: true,
      remove: false,
      browsers: [
        'last 4 versions',
        '> 2%'
      ]
    }))
    .pipe(rename('styles.min.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
    .pipe( notify({ message: "sass tasks have been completed!"}) );
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('app/js/plugins/**/*.js')
        .pipe(concat('main.js'))
        .pipe(gulp.dest('app/js'))
        .pipe(rename('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.reload({
          stream: true
        }))
        .pipe( notify({ message: "plugins have been compiled!"}) );
});

gulp.task('copyJSLibraries', function() {
  return gulp.src('app/js/library/**/*.js')
    .pipe(gulp.dest('dist/js/library'))
    .pipe(browserSync.reload({
      stream: true
    }))
    .pipe( notify({ message: "js libraries have been moved to dist!"}) );
});


/*in order to make sure the image path matches the path in Wordpress,
you can change the "dist" destination below. Instead of "dist/images" it would be something like
dist/interactive/2018/10/your-project/images.
Note: Remember to only upload the /images folder to your project folder in Wordpress (not the whole
"dist/interactive/2018/..." since that would defeat the purpose)*/
gulp.task('images', function(){
  return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
  .pipe(cache(imagemin()))
  .pipe(gulp.dest('dist/interactive/2018/10/bubble/images'))
  .pipe(browserSync.reload({
    stream: true
  }))
  .pipe( notify({ message: "image tasks have been completed!"}) );
});

/* see above note about images, same applies here */
gulp.task('data', function(){
  return gulp.src('app/data/**/*.csv')
  .pipe(csv2json())
  .pipe(gulp.dest('dist/interactive/2018/10/bubble/data'))
  .pipe(browserSync.reload({
    stream: true
  }))
  .pipe( notify({ message: "data tasks have been completed!"}) );
});

gulp.task('html', function(){
  var options = {
    "indent_size": 4
  };
  return gulp.src('dist/index.html')
  .pipe(strip())
  .pipe(htmlbeautify({options}))
  .pipe(gulp.dest('dist'))
  .pipe(browserSync.reload({
    stream: true
  }))
  .pipe( notify({ message: "html tasks have been completed!"}) );
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'dist'
    },
  })
});

gulp.task('fileinclude', function() {
  return gulp.src(['app/**/*.html'])
  .pipe(fileinclude())
    .pipe(useref())
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({
      stream: true
    }))
    .pipe( notify({ message: "fileInclude tasks have been completed!"}) );
});

gulp.task('watch', ['browserSync', 'sass', 'scripts', 'copyJSLibraries', 'images', 'data', 'fileinclude', 'html'], function (){
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('app/**/*.html', ['fileinclude']);
  gulp.watch('app/js/plugins/**/*.js', ['scripts']);
  gulp.watch('app/js/library/**/*.js', ['copyJSLibraries']);
  gulp.watch('app/images/**/*', ['images']);
  gulp.watch('app/data/**/*', ['data']);
});

gulp.task('useref', function(){
  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulp.dest('dist'))
    .pipe( notify({ message: "useref tasks have been completed!"}) );
});

gulp.task('clean:dist', function() {
  return del.sync('dist/**/*');
})


gulp.task('default', function (callback) {
  runSequence(['clean:dist', 'sass', 'images', 'data', 'fileinclude', 'scripts', 'copyJSLibraries', 'useref', 'html', 'browserSync', 'watch'],
    callback
  )
})

gulp.task('build', function (callback) {
  runSequence(
    'clean:dist',
    'sass',
    'images',
    'data',
    'fileinclude',
    'scripts',
    'copyJSLibraries',
    'html',
    callback
  )
})
