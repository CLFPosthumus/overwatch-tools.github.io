var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var packageJSON =require('./package.json');
var config = require('./gulp.config.json');
var browserSync = require('browser-sync');
var addStream = require('add-stream');

function vendorsJs() {
    return gulp.src(config.paths.src.vendorJs)
        .pipe($.concat(config.packageName + '.vendors.min.js'))
        .pipe(gulp.dest(config.paths.dist.js));
}

function getEnvConfig(){
    var configFile = './env/' + (process.env.NODE_ENV || 'production') + '.json';

    return gulp.src(configFile)
        .pipe($.ngConfig('overwatch-hero-picker.config'));
}

function app() {

    return gulp.src(config.paths.src.js)
        .pipe($.plumber())
       // .pipe($.eslint())
        .pipe($.babel({
            presets: ['es2015']
        }))
        //.pipe($.ngAnnotate())
        .pipe($.angularEmbedTemplates())

        .pipe(addStream.obj(getEnvConfig()))
        //.pipe($.uglify())
        .pipe($.concat(config.packageName + '.min.js'))
        .pipe(gulp.dest(config.paths.dist.js));
}
function vendorsCss() {
    return gulp.src(config.paths.src.vendorCss)
        .pipe($.concat(config.packageName + '.vendors.min.css'))
        .pipe(gulp.dest(config.paths.dist.css));
}
function styles() {
    return gulp.src(config.paths.src.less)
        .pipe($.plumber(function(err){
            console.error(err);
            this.emit('end');
        }))
        .pipe($.less())
        //.pipe($.cleanCss())
        .pipe($.concat(config.packageName + '.min.css'))
        .pipe(gulp.dest(config.paths.dist.css));
}
function watch(cb) {
    gulp.watch(config.paths.lessWatch, styles);
    gulp.watch([].concat(config.paths.src.html).concat(config.paths.src.js), app);
    gulp.watch(config.paths.src.index, buildIndexHtml);
    cb();
}
function buildIndexHtml(){
    return gulp.src(config.paths.src.index)
        .pipe($.template({
            version: packageJSON.version
        }))
        .pipe(gulp.dest(config.paths.dist.index));

}

function serve(cb) {
    browserSync({
        files: [config.paths.dist.css, config.paths.dist.js],
        server: {
            baseDir: '.'
        }
    });
    cb();
}
gulp.task('default', gulp.series(vendorsJs,vendorsCss, app, styles, buildIndexHtml, watch, serve));

