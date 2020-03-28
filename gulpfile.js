const gulp = require('gulp'); //подключаем Gulp
const browserSync = require('browser-sync').create();
const watch = require('gulp-watch');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const del = require('del')

const pug = require('gulp-pug')

//Таск для сборки gulp файлов
gulp.task('pug', function (callback) {
    return gulp.src('./src/pug/pages/**/*.pug')
        .pipe( plumber({
            errorHandler: notify.onError(function(err){
                return {
                    title: 'Pug',
                    sound: false,
                    message: err.message
                }
            })
        }))
        .pipe( pug({
            pretty: true
        }) )
        .pipe( gulp.dest('./build/') )
        .pipe( browserSync.stream() )
    callback();
})

//таск для компиляции из SCSS  в CSS
gulp.task('scss', function(callback ) {
    return gulp.src('./src/scss/main.scss')
        .pipe( plumber({
            errorHandler: notify.onError(function(err){
                return {
                    title: 'Styles',
                    sound: false,
                    message: err.message
                }
            })
        }))
        .pipe( sourcemaps.init() )
        .pipe( sass() )
        .pipe( autoprefixer({
            overrideBrowserslist: ['last 4 versions']
        }) )
        .pipe( sourcemaps.write() )
        .pipe( gulp.dest('./build/css/') )
        .pipe( browserSync.stream() )
    callback()
});

// копирование изображений
gulp.task('copy:img', function(callback) {
    return gulp.src('./src/img/**/*.*')
        .pipe( gulp.dest('./build/img'))
    callback();
});

// копирование JS файлов
gulp.task('copy:js', function(callback) {
    return gulp.src('./src/js/**/*.*')
        .pipe( gulp.dest('./build/js'))
    callback();
});

// копирование шрифтов
gulp.task('copy:fonts', function(callback) {
    return gulp.src('./src/fonts/**/*.*')
        .pipe( gulp.dest('./build/fonts'))
    callback();
});

//слежение за HTML и CSS файлами
gulp.task('watch', function() {

    //следим за картинками и скриптами, и обновляем браузер
    watch( ['./build/js/**/*.*', './build/img/**/*.*', './build/fonts/**/*.*' ], gulp.parallel(browserSync.reload) );

    //Слежение за SCSS и комиляция в CSS
    watch('./src/scss/**/*.scss', function () {
        setTimeout( gulp.parallel('scss'), 1000 )
    })

    //слежение за PUG и сборка
    watch('./src/pug/**/*.pug', gulp.parallel('pug'))

    //слежение за картинкми и скритами, и копируем их в build
    watch('./src/img/**/*.*', gulp.parallel('copy:img'))
    watch('./src/js/**/*.*', gulp.parallel('copy:js'))
    watch('./src/fonts/**/*.*', gulp.parallel('copy:fonts'))
});



//задача для стартра сервера
gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "./build/"
        }
    });    
});
gulp.task('clean:build', function() {
    return del('./build')
})

//задача для старта сервера
gulp.task('default', gulp.series( gulp.parallel('clean:build'), gulp.parallel('scss', 'pug', 'copy:img', 'copy:js', 'copy:fonts'), gulp.parallel('server', 'watch')))