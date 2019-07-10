const gulp = require('gulp');
const watch = require('gulp-watch');
const minihtml = require('gulp-minify-html');//引入压缩HTML的插件
const minisass = require('gulp-sass');//压缩sass的插件
const minicss = require('gulp-minify-css')//压缩css的插件
const rename = require('gulp-rename');//重命名插件
const miniimg = require('gulp-imagemin');//压缩图片的插件
const babel = require('gulp-babel');//es6转es5
const core = require('babel-core');
const es2015 = require('babel-preset-es2015');
const minijs = require('gulp-uglify');//压缩js的插件
// 复制已经压缩的第三方插件
gulp.task('copythird', function (done) {
    gulp.src('src/script/thirdplugins/*.min.js')
        .pipe(gulp.dest('dist/script/thirdplugins/'));
    done();
})
// 压缩html文件
gulp.task('uglifyhtml', () => {
    return gulp.src('src/*.html')
        .pipe(minihtml())
        .pipe(gulp.dest('dist/'));
})
//压缩CSS文件
gulp.task('uglifycss', () => {
    return gulp.src('src/css/*.css')
        .pipe(minicss())
        .pipe(gulp.dest('dist/css/'));
})
// 将js中的es6转化成es5，并压缩JS
//gulp-babel gulp-core  babel-preset-es2015
gulp.task('babeljs', () => {
    return gulp.src('src/script/js/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(minijs())
        .pipe(gulp.dest('dist/script/js/'));
})
gulp.task('babelthirdjs', () => {
    return gulp.src('src/script/thirdplugins/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(minijs())
        .pipe(gulp.dest('dist/script/thirdplugins/'));
})
// 压缩js
// gulp.task('uglifyjs', () => {
//     return gulp.src('src/script/js/*.js')
//         .pipe(minijs())
//         .pipe(gulp.dest('dist/script/js/'));
// })

// 压缩图片
gulp.task('uglifyimg', () => {
    return gulp.src('src/img/*.{png,jpg,gif,ico}')
        .pipe(miniimg({
            optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
        }))
        .pipe(gulp.dest('dist/img/'));
})

// 监听事件
gulp.task('default', function () {
    watch(['src/script/thirdplugins/*.min.js', 'src/*.html', 'src/css/*.css', 'src/script/js/*.js', 'src/img/*.{png,jpg,gif,ico}'],
        gulp.parallel('copythird', 'uglifyhtml', 'uglifycss', 'babeljs', 'uglifyimg'));
})

