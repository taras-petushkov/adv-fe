var argv = require('yargs').argv;
var autoprefixer = require('gulp-autoprefixer');
var bower = require('gulp-bower');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var csscomb = require('gulp-csscomb');
var cssnano = require('gulp-cssnano');
var debug = require('gulp-debug');
var declare = require('gulp-declare');
var gitmodified0 = require('gulp-gitmodified');
var gulp = require('gulp');
var gulpif = require('gulp-if');
var handlebars = require('gulp-handlebars');
var htmlhint = require("gulp-htmlhint");
var htmlmin = require('gulp-htmlmin');
var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');
var less = require('gulp-less');
var livereload = require('gulp-livereload');
var runSequence = require('run-sequence');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var wrap = require('gulp-wrap');

var srcDir = 'src';
var buildDir = 'build';
var libDir = buildDir + '/lib';
var clientDir = buildDir + '/client';
var clientStaticDir = clientDir + '/static';
var clientLibDir = clientDir + "/lib";
var jsMapDir = 'maps';
var cssMapDir = '.';
var isProd = argv.prod;
var isAll = argv.all;

var path = {
    html: srcDir + '/**/*.html',
    images: srcDir + '/**/*.{png,jpg,svg}',
    scripts: srcDir + '/**/*.js',
    templates: srcDir + '/blocks/**/*.hbs',
    css: srcDir + '/**/*.less'
};

gulp.task('default', function (cb) {
    runSequence('clean', 'bower', 'libs', 'build', cb);
});

gulp.task('clean', function () {
    return gulp.src(buildDir + '/*', { read: false })
        .pipe(clean({ force: true }));
});

gulp.task('bower', function () {
    return bower()
        .pipe(gulp.dest(libDir))
});

gulp.task('libs', function () {
    return gulp.src(libDir + '/**/*.min.js')
        .pipe(gulp.dest(clientLibDir));
});

gulp.task('build', function (cb) {
    runSequence('copy-static', 'templates', 'scripts', 'css', cb);
});

gulp.task('copy-static', function (cb) {
    runSequence('copy-html', 'copy-images', cb);
});

gulp.task('copy-html', function () {
    return gulp.src(path.html)
        .pipe(gulpif(isProd, htmlmin({ collapseWhitespace: true })))
        .pipe(gulp.dest(clientDir))
        .pipe(livereload());
});

gulp.task('copy-images', function () {
    return gulp.src(path.images)
        .pipe(gulp.dest(clientDir))
        .pipe(livereload());
});

gulp.task('css', function () {
    return gulp.src(path.css)
        .pipe(concat('styles.css'))
        .pipe(less())
        .pipe(sourcemaps.init())
        .pipe(autoprefixer())
        .pipe(gulpif(isProd, cssnano()))
        .pipe(sourcemaps.write(cssMapDir))
        .pipe(gulp.dest(clientStaticDir))
        .pipe(livereload());
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
        .pipe(sourcemaps.init())
        .pipe(gulpif(isProd, uglify()))
        .pipe(sourcemaps.write(jsMapDir))
        .pipe(gulp.dest(clientDir))
        .pipe(livereload());
});

gulp.task('scripts', function () {
    gulp.src(path.scripts)
        .pipe(concat('app.js'))
        .pipe(sourcemaps.init())
        .pipe(gulpif(isProd, uglify()))
        .pipe(sourcemaps.write(jsMapDir))
        .pipe(gulp.dest(clientDir))
        .pipe(livereload());
});

gulp.task('watch', function () {
    livereload.listen();
    gulp.watch(path.scripts, ['scripts']);
    gulp.watch(path.templates, ['templates']);
    gulp.watch(path.css, ['css']);
    gulp.watch(path.html, ['copy-html']);
    gulp.watch(path.images, ['copy-images']);
});

gulp.task('style', function (cb) {
    runSequence('style-jscs', 'style-csscomb', 'style-jshint', 'style-htmlhint', cb);
});

function gitmodified() {
    return gitmodified0(['added', 'modified', 'untracked', 'renamed', 'copied', 'updated but unmerged']);
}

gulp.task('style-jscs', function () {
    return gulp.src(path.scripts)
        .pipe(gulpif(!isAll, gitmodified()))
        .pipe(debug({ title: 'jscs' }))
        .pipe(jscs({ fix: true }))
        .pipe(gulp.dest(srcDir));
});

gulp.task('style-csscomb', function () {
    return gulp.src(path.css)
        .pipe(gulpif(!isAll, gitmodified()))
        .pipe(debug({ title: 'csscomb' }))
        .pipe(csscomb())
        .pipe(gulp.dest(srcDir));
});

gulp.task('style-jshint', function () {
    return gulp.src(path.scripts)
        .pipe(gulpif(!isAll, gitmodified()))
        .pipe(debug({ title: 'jshint' }))
        .pipe(jshint())
        .pipe(jshint.reporter('default', { verbose: true }))
        .pipe(jshint.reporter('fail'))
});

gulp.task('style-htmlhint', function () {
    gulp.src(path.html)
        .pipe(gulpif(!isAll, gitmodified()))
        .pipe(debug({ title: 'htmlhint' }))
        .pipe(htmlhint())
        .pipe(htmlhint.failReporter())
});

