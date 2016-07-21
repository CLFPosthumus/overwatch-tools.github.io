var $ = require('gulp-load-plugins)');
var config = require('gulp.config.json');

var build = gulp.series(app, styles);

function app() {
    return gulp.src(config.paths.src.js)
        .pipe($.ngAnnotate())
        .pipe($.babel())
        .pipe($.uglify())
        .pipe($.concat(config.packageName + '.min.js'))
        .dest(config.paths.dist.js);
}
function styles() {
    return gulp.src(config.paths.src.less)
        .pipe($.less())
        .pipe($.cleanCss())
        .pipe($.concat(config.packageName + '.min.css'))
        .dest(config.paths.dist.css);
}

gulp.task('default', build);
