import { deleteAsync } from 'del';
import gulp from 'gulp';
import less from 'gulp-less';
import cleanCSS from 'gulp-clean-css';
import rename from 'gulp-rename';
import babel from 'gulp-babel';
import uglify from 'gulp-uglify';
import concat from 'gulp-concat';

const paths = {
    styles: {
        src: 'src/styles/**/*.less',
        dest: 'dist/css/'
    },
    scripts: {
        src: 'src/scripts/**/*.js',
        dest: 'dist/js/'
    }
}

export const clean = () => {
    return deleteAsync(["dist"]);
}

export const scripts = () => {
    return gulp.src(paths.scripts.src, {
        sourcemaps: true
    })
        .pipe(babel())
        .pipe(uglify())
        .pipe(concat('main.min.js'))
        .pipe(gulp.dest(paths.scripts.dest))
}

export const styles = () => {
    return gulp.src(paths.styles.src)
        .pipe(less())
        .pipe(cleanCSS())
        .pipe(rename({
            basename: "main",
            suffix: ".min"
        }))
        .pipe(gulp.dest(paths.styles.dest))
}

export const watch = () => {
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.scripts.src, scripts);
}

export const build = gulp.series(clean, gulp.parallel(styles, scripts), watch);


