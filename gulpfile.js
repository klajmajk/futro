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
				'src/scripts/**/*.js',
				bower + '/Chart.js/Chart.min.js',
				bower + '/textAngular/dist/textAngular-rangy.min.js',
				bower + '/angular-utils-pagination/dirPagination.js',
				bower + '/angular-chart.js/dist/angular-chart.js'
			],
			dest: 'www/assets/js'
		},
		images: {
			src: [
				'src/images/**/!(*.xcf)',
				'!src/images/{_unused,_unused/**}'],
			dest: 'www/assets/img'
		}
	};

gulp.task('scripts', function() {
	var path = paths.scripts;
	return gulp.src(path.src)
		.pipe(p.order([
			bower + '/Chart.js/Chart.min.js',
			bower + '/**/*.js',
			'src/scripts/app.js',
			'src/scripts/**/*.js',
		], {base: ''}))
		.pipe(p.if(/[\\\/]scripts[\\\/]/, p.multipipe(
				p.jshint(), p.jshint.reporter('default'))))		
		.pipe(p.debug())
		.pipe(p.concat('main.js'))
		.pipe(gulp.dest(path.dest))
		.pipe(p.rename({suffix: '-min'}))
		.pipe(p.ngAnnotate())
		.pipe(p.uglify())
		.pipe(gulp.dest(path.dest))
		.pipe(p.notify({message: 'Scripts task complete'}));
});

gulp.task('images', function() {
	var path = paths.images;
    return gulp.src(path.src)
		.pipe(p.if(/\.(png)|(jpe?g)|(gif)$/, p.cache(p.imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        }))))
        .pipe(p.debug())
        .pipe(gulp.dest(path.dest))
        .pipe(p.notify({ message: 'Images task complete' }));
});

gulp.task('clean', function(cb) {
	del(Object.keys(paths).map(function(key) {
		return paths[key].dest;
	}), cb);
});

gulp.task('default', ['clean'], function() {
    gulp.start('scripts', 'images');
});

gulp.task('watch', function() {
	//livereload
	p.livereload.listen();
	
	for(var key in paths)
		gulp.watch(paths[key].src, [key]);
});