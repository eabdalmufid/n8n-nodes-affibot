const gulp = require('gulp');

function copyIcons() {
	return gulp.src('nodes/**/*.{svg,png,jpg,gif}')
		.pipe(gulp.dest('dist/nodes'));
}

exports.default = copyIcons;
