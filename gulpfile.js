const nconf = require('nconf');
nconf.file({ file: '../config/config.json' });

const gulp = require('gulp');
const babel = require('gulp-babel');
const del = require('del');

const paths = {
    jsFiles: 'sources/**/*.js',
    compiled: 'lib'
};

gulp.task('clean', () => {
    console.log('Cleaning previous compilation files...');
    return del(paths.compiled);
});

gulp.task('build', ['clean'], () => {
    console.log('Building project...');
    return gulp.src(paths.jsFiles)
        .pipe(babel())
        .pipe(gulp.dest(paths.compiled));
});