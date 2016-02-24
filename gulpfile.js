var gulp = require('gulp');
var bower = require('gulp-bower');
var clean = require('gulp-clean');
var less = require('gulp-less');
var concat = require('gulp-concat');
var runSequence = require('run-sequence');
var argv = require('yargs').argv;
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var handlebars = require('gulp-handlebars');
var declare = require('gulp-declare');
var wrap = require('gulp-wrap');
var uglify = require('gulp-uglify');

var srcDir = 'src';
var buildDir = 'build';
var libDir = buildDir + '/lib';
var clientDir = buildDir + '/client';
var clientStaticDir = clientDir + '/static';
var clientLibDir = clientDir + "/lib";
var isProd = argv.prod

gulp.task('default', function (cb) {
    runSequence('clean', 'bower', 'libs', 'build', cb);
});

gulp.task('bower', function () {
    return bower()
        .pipe(gulp.dest(libDir))
});

gulp.task('libs', function () {
    return gulp.src(libDir + '/**/*.min.js')
        .pipe(gulp.dest(clientLibDir));
});

gulp.task('copy-static', function () {
    return gulp.src(srcDir + '/**/*.{html,png,jpg,svg}')
        .pipe(gulp.dest(clientDir));
});

gulp.task('css', function () {
    return gulp.src(srcDir + '/**/*.css')
        .pipe(concat('styles.css'))
        .pipe(less())
        .pipe(gulpIf(isProd, cssnano()))
        .pipe(gulp.dest(clientStaticDir));
});

gulp.task('templates', function () {
    return gulp.src(srcDir + '/blocks/**/*.hbs')
        .pipe(handlebars())
        .pipe(wrap('Handlebars.template(<%= contents %>)'))
        .pipe(declare({
            namespace: 'App.templates',
            noRedeclare: true
        }))
        .pipe(concat('templates.js'))
        .pipe(gulp.dest(clientDir));
});

gulp.task('scripts', function () {
    gulp.src([srcDir +'/blocks/**/*.js', srcDir + '/*.js'])
        .pipe(concat('app.js'))
        .pipe(gulpIf(isProd, uglify()))
        .pipe(gulp.dest(clientDir));
});

gulp.task('build', function (cb) {
    runSequence(
        'copy-static',
        'templates',
        'scripts',
        'css',
        cb
    );
});

gulp.task('clean', function () {
    return gulp.src(buildDir + '/*', {read: false})
        .pipe(clean({force: true}));
});
