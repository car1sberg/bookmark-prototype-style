let gulp = require('gulp'),
    babel = require('gulp-babel');

gulp.task('es6', () => {
    return gulp.src('src/js/**/*.js')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest('dist/js'))
});

gulp.task('default', ['es6'], () => {
    gulp.watch('src/js/**/*.js', ['es6']);
});