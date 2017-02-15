var gulp = require('gulp'),
  plum = require('gulp-plumber'),
  pug = require('gulp-pug'),
  sass = require('gulp-sass'),
  post = require('gulp-postcss'),
  pref = require('autoprefixer'),
  nano = require('cssnano'),
  brow = require('browser-sync').create(),
  reload = brow.reload;

var src = {
  pug: './dev/views/',
  sass: './dev/scss/',
  html: './dist/',
  css: './dist/css/'
};

var pugOptions = {
  pretty: true
};

var sassOptions = {
  outputStyle: 'nested'
};

var postPlugins = [
  pref({
    browsers: 'last 5 versions',
    grid: false,
    cascade: true
  }),
  nano({
    core: false
  })
];

gulp.task('pug', function () {
  return gulp.src(src.pug + '*.pug')
    .pipe(plum())
    .pipe(pug(pugOptions))
    .pipe(plum.stop())
    .pipe(gulp.dest(src.html));
});

gulp.task('styles', function () {
  return gulp.src(src.sass + '*.scss')
    .pipe(plum())
    .pipe(sass(sassOptions))
    .pipe(post(postPlugins))
    .pipe(plum.stop())
    .pipe(gulp.dest(src.css))
    .pipe(reload({stream: true}));
});

gulp.task('default', ['pug', 'styles'], function () {
  brow.init({server: src.html});

  gulp.watch(src.pug + '**/*.pug', ['pug']);
  gulp.watch(src.sass + '**/*.scss', ['styles']);
  gulp.watch(src.html + '*.html').on('change', reload);
});
