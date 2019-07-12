// const gulp = require('gulp');
// const watch = require('gulp-watch');
// const minihtml = require('gulp-minify-html');//引入压缩HTML的插件
// const minisass = require('gulp-sass');//压缩sass的插件
// const minicss = require('gulp-minify-css')//压缩css的插件
// const rename = require('gulp-rename');//重命名插件
// const miniimg = require('gulp-imagemin');//压缩图片的插件
// const babel = require('gulp-babel');//es6转es5
// const es2015 = require('babel-preset-es2015');
// const minijs = require('gulp-uglify');//压缩js的插件
const gulp = require('gulp');//引入gulp
const watch = require('gulp-watch');//引入监听的gulp插件
const minihtml = require('gulp-minify-html');//引入html的压缩插件
const comfilesass = require('gulp-sass');//编译sass
const minicss = require('gulp-minify-css');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const babel = require('gulp-babel');
const es2015 = require('babel-preset-es2015');
// // 复制已经压缩的第三方插件
// gulp.task('copythird', function () {
//     gulp.src('src/script/thirdplugins/*.min.js')
//         .pipe(gulp.dest('dist/script/thirdplugins/'));
// })
// 压缩html文件
gulp.task('uglifyhtml', () => {
    return gulp.src('src/*.html')//引入文件
        .pipe(minihtml())//执行压缩插件
        .pipe(gulp.dest('dist/'));//输出
});
//压缩CSS文件
gulp.task('uglifycss', () => {
    return gulp.src('src/css/*.css')//引入文件
        .pipe(minicss())//执行压缩插件
        .pipe(gulp.dest('dist/css/'));//输出
});
// 将js中的es6转化成es5，并压缩JS
//gulp-babel gulp-core  babel-preset-es2015
gulp.task('babeljs', () => {
    return gulp.src('src/script/js/*.js')//引入文件
        .pipe(babel({
            presets: ['es2015']
        }))//执行压缩插件
        .pipe(uglify())
        .pipe(gulp.dest('dist/script/js/'));//输出
});
gulp.task('babelthirdjs', () => {
    return gulp.src('src/script/thirdplugins/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/script/thirdplugins/'));
})
// 压缩图片
gulp.task('uglifyimg', () => {
    return gulp.src('src/img/*.{png,jpg,gif,ico}')
        .pipe(imagemin({
            optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
        }))
        .pipe(gulp.dest('dist/img/'));
})

// 监听事件
gulp.task('default', function () {
    watch(['src/*.html', 'src/css/*.css', 'src/script/js/*.js', 'src/script/thirdplugins/*.js', 'src/img/*.{png,jpg,gif,ico}'],
        gulp.parallel('uglifyhtml', 'uglifycss', 'babeljs', 'babelthirdjs', 'uglifyimg'));
})

