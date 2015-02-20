var gulp = require('gulp'),
    del = require('del'),
    p = require('gulp-load-plugins')({
      pattern: ['gulp-*', 'gulp.*', 'main-bower-files', 'multipipe'],
      replaceString: /\bgulp[\-.]/
    });

var bower = 'bower_components',
	paths = {
		scripts: {
			src: [
				'scripts/**/*.js',
				bower + '/Chart.js/Chart.min.js',
				bower + '/textAngular/dist/textAngular-rangy.min.js',
				bower + '/angular-utils-pagination/dirPagination.js',
				bower + '/angular-chart.js/dist/angular-chart.js'
			],
			dest: '../www/assets/js'
		},
		images: {
			src: ['images/**/!(*.xcf)'],
			dest: '../www/assets/img'
		}
	};

gulp.task('scripts', function() {
	return gulp.src(paths.scripts.src)
		.pipe(p.order([
			bower + '/Chart.js/Chart.min.js',
			bower + '/**/*.js',
			'scripts/app.js',
			'scripts/**/*.js'
		], {base: ''}))
		.pipe(p.if(/[\\\/]scripts[\\\/]/, p.multipipe(
				p.jshint(), p.jshint.reporter('default'))))		
		.pipe(p.debug())
		.pipe(p.concat('main.js'))
		.pipe(gulp.dest(paths.scripts.dest))
		.pipe(p.rename({suffix: '-min'}))
		.pipe(p.ngAnnotate())
		.pipe(p.uglify())
		.pipe(gulp.dest(paths.scripts.dest))
		.pipe(p.notify({message: 'Scripts task complete'}));
});

gulp.task('images', function() {
    return gulp.src(paths.images.src)
		.pipe(p.if(/\.(png)|(jpe?g)|(gif)$/, p.cache(p.imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        }))))
        .pipe(p.debug())
        .pipe(gulp.dest(paths.images.dest))
        .pipe(p.notify({ message: 'Images task complete' }));
});

gulp.task('clean', function(cb) {
    var dirs = [];
	for (var path in paths)
		dirs.push(paths[path].dest);
    del(dirs, cb);
});

gulp.task('default', ['clean'], function() {
    gulp.start('scripts', 'images');
});

gulp.task('watch', function() {
	//livereload
	p.livereload.listen();

   // Watch .scss files
   gulp.watch(paths.scripts.src, ['scripts']);
   // Watch image files
   gulp.watch(paths.images.src, ['images']);
});