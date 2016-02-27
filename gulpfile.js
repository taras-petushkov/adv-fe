var argv = require('yargs').argv;
var autoprefixer = require('gulp-autoprefixer');
var bower = require('gulp-bower');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var csscomb = require('gulp-csscomb');
var cssnano = require('gulp-cssnano');
var debug = require('gulp-debug');
var declare = require('gulp-declare');
var gitmodifiedOrigin = require('gulp-gitmodified');
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

var isProd = argv.prod;
var isAll = argv.all;

var path = {
    src: {
        dir: 'src',
        html: 'src/**/*.html',
        images: 'src/**/*.{png,jpg,svg}',
        templates: 'src/blocks/**/*.hbs',
        scripts: 'src/**/*.js',
        css: 'src/**/*.less'
    },
    libs: {
        dir: 'build/lib',
        min: 'build/lib/**/*.min.js'
    },
    dest: {
        dir: 'build',
        all: 'build/*',
        html: 'build/client',
        images: 'build/client',
        templates: 'build/client',
        scripts: 'build/client',
        css: 'build/client/static',
        libs: 'build/client/lib'
    }
};

gulp.task('default', function (cb) {
    runSequence('clean', 'bower', 'libs', 'build', cb);
});

gulp.task('clean', function () {
    return gulp.src(path.dest.all, { read: false })
        .pipe(clean({ force: true }));
});

gulp.task('bower', function () {
    return bower()
        .pipe(gulp.dest(path.libs.dir))
});

gulp.task('libs', function () {
    return gulp.src(path.libs.min)
        .pipe(gulp.dest(path.dest.libs));
});

gulp.task('build', function (cb) {
    runSequence('copy-static', 'css', 'templates', 'scripts', cb);
});

gulp.task('copy-static', function (cb) {
    runSequence('copy-html', 'copy-images', cb);
});

gulp.task('copy-html', function () {
    return gulp.src(path.src.html)
        .pipe(gulpif(isProd, htmlmin({ collapseWhitespace: true })))
        .pipe(gulp.dest(path.dest.html))
        .pipe(livereload());
});

gulp.task('copy-images', function () {
    return gulp.src(path.src.images)
        .pipe(gulp.dest(path.dest.images))
        .pipe(livereload());
});

gulp.task('css', function () {
    return gulp.src(path.src.css)
        .pipe(concat('styles.css'))
        .pipe(less())
        .pipe(sourcemaps.init())
        .pipe(autoprefixer())
        .pipe(cssnano())
        .pipe(gulpif(!isProd, sourcemaps.write()))
        .pipe(gulp.dest(path.dest.css))
        .pipe(livereload());
});

gulp.task('templates', function () {
    return gulp.src(path.src.templates)
        .pipe(handlebars())
        .pipe(wrap('Handlebars.template(<%= contents %>)'))
        .pipe(declare({
            namespace: 'App.templates',
            noRedeclare: true
        }))
        .pipe(concat('templates.js'))
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(gulpif(!isProd, sourcemaps.write()))
        .pipe(gulp.dest(path.dest.templates))
        .pipe(livereload());
});

gulp.task('scripts', function () {
    gulp.src(path.src.scripts)
        .pipe(concat('app.js'))
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(gulpif(!isProd, sourcemaps.write()))
        .pipe(gulp.dest(path.dest.scripts))
        .pipe(livereload());
});


gulp.task('watch', function () {
    livereload.listen();
    gulp.watch(path.src.scripts, ['scripts']);
    gulp.watch(path.src.templates, ['templates']);
    gulp.watch(path.src.css, ['css']);
    gulp.watch(path.src.html, ['copy-html']);
    gulp.watch(path.src.images, ['copy-images']);
});


gulp.task('style', function (cb) {
    runSequence('style-jscs', 'style-csscomb', 'style-jshint', 'style-htmlhint', cb);
});

function gitmodified() {
    return gitmodifiedOrigin(['added', 'modified', 'untracked', 'renamed', 'copied', 'updated but unmerged']);
}

gulp.task('style-jscs', function () {
    return gulp.src(path.src.scripts)
        .pipe(gulpif(!isAll, gitmodified()))
        .pipe(debug({ title: 'jscs' }))
        .pipe(jscs({ fix: true }))
        .pipe(gulp.dest(path.src.dir));
});

gulp.task('style-csscomb', function () {
    return gulp.src(path.src.css)
        .pipe(gulpif(!isAll, gitmodified()))
        .pipe(debug({ title: 'csscomb' }))
        .pipe(csscomb())
        .pipe(gulp.dest(path.src.dir));
});

gulp.task('style-jshint', function () {
    return gulp.src(path.src.scripts)
        .pipe(gulpif(!isAll, gitmodified()))
        .pipe(debug({ title: 'jshint' }))
        .pipe(jshint())
        .pipe(jshint.reporter('default', { verbose: true }))
        .pipe(jshint.reporter('fail'))
});

gulp.task('style-htmlhint', function () {
    gulp.src(path.src.html)
        .pipe(gulpif(!isAll, gitmodified()))
        .pipe(debug({ title: 'htmlhint' }))
        .pipe(htmlhint())
        .pipe(htmlhint.failReporter())
});
