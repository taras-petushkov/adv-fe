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
var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');
var htmlhint = require("gulp-htmlhint");

var srcDir = 'src';
var buildDir = 'build';
var libDir = buildDir + '/lib';
var clientDir = buildDir + '/client';
var clientStaticDir = clientDir + '/static';
var clientLibDir = clientDir + "/lib";
var isProd = argv.prod;

var path = {
    html: srcDir + '/**/*.html',
    static: srcDir + '/**/*.{html,png,jpg,svg}',
    scripts: [srcDir + '/blocks/**/*.js', srcDir + '/*.js'],
    templates: srcDir + '/blocks/**/*.hbs',
    css: srcDir + '/**/*.less'
}

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
    return gulp.src(path.static)
        .pipe(gulp.dest(clientDir));
});

gulp.task('css', function () {
    return gulp.src(path.css)
        .pipe(concat('styles.css'))
        .pipe(less())
        .pipe(gulpIf(isProd, cssnano()))
        .pipe(gulp.dest(clientStaticDir));
});

gulp.task('templates', function () {
    return gulp.src(path.templates)
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
    gulp.src(path.scripts)
        .pipe(concat('app.js'))
        .pipe(gulpIf(isProd, uglify()))
        .pipe(gulp.dest(clientDir));
});

gulp.task('style-jscs', function () {
    return gulp.src(path.scripts)
        .pipe(jscs({fix: true}))
        .pipe(gulp.dest(srcDir));
});

gulp.task('style-jshint', function () {
    return gulp.src(path.scripts)
        .pipe(jshint())
        .pipe(jshint.reporter('default', { verbose: true }))
        .pipe(jshint.reporter('fail'))
});

gulp.task('style-htmlhint', function () {
    gulp.src(path.html)
        .pipe(htmlhint())
        .pipe(htmlhint.failReporter())
});

gulp.task('style', function (cb) {
    runSequence(
        'style-jscs',
        'style-jshint',
        'style-htmlhint',
        cb
    );
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

gulp.task('watch', function () {
    gulp.watch(path.scripts, ['scripts']);
    gulp.watch(path.templates, ['templates']);
    gulp.watch(path.css, ['css']);
    gulp.watch(path.static, ['copy-static']);
});

gulp.task('clean', function () {
    return gulp.src(buildDir + '/*', {read: false})
        .pipe(clean({force: true}));
});
