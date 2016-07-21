var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var config = require('./gulp.config.json');
var browserSync = require('browser-sync');

function vendorsJs() {
    return gulp.src(config.paths.src.vendorJs)
        .pipe($.concat(config.packageName + '.vendors.min.js'))
        .pipe(gulp.dest(config.paths.dist.js));
}
function app() {
    return gulp.src(config.paths.src.js)
        .pipe($.ngAnnotate())
        .pipe($.angularEmbedTemplates())
        .pipe($.babel())
        .pipe($.uglify())
        .pipe($.concat(config.packageName + '.min.js'))
        .pipe(gulp.dest(config.paths.dist.js));
}
function styles() {
    return gulp.src(config.paths.src.less)
        .pipe($.less())
        .pipe($.cleanCss())
        .pipe($.concat(config.packageName + '.min.css'))
        .pipe(gulp.dest(config.paths.dist.css));
}
function watch(cb) {
    gulp.watch(config.paths.src.less, styles);
    gulp.watch(config.paths.src.js, app);

    cb();
}

function serve(cb) {
    browserSync({
        files: [config.paths.dist.js + '**.js', config.paths.dist.css + '**.css'],
        server: {
            baseDir: '.'
        }
    });
    cb();
}
gulp.task('default', gulp.series(vendorsJs, app, styles, watch, serve));
