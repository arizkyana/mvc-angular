var gulp = require('gulp');
var webserver = require('gulp-webserver');


gulp.task('webserver', function() {
    gulp.src('app').pipe(webserver({
        livereload: true,
        directoryListing: {
            // enable: true,
            path: 'app/index.html'
        },
        fallback: 'index.html',
        open: true
    }));
});

gulp.task('default', ['webserver']);