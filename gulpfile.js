/**
 * Created by Vladimir on 8/5/2016.
 */

var gulp = require('gulp');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssNano = require('gulp-cssnano');
var del = require('del');
var runSequence = require('run-sequence');
var autoPrefixer = require('gulp-autoprefixer');
var sourceMaps = require('gulp-sourcemaps');

gulp.task('bundle', function (){
	return gulp.src('client/index.html')
		.pipe(useref())
		.pipe(sourceMaps.init())
			.pipe(gulpIf('*.js', uglify()))
			.pipe(gulpIf('*.css', autoPrefixer()))
			.pipe(gulpIf('*.css', cssNano()))
		.pipe(sourceMaps.write())
		.pipe(gulp.dest('build'));
});

gulp.task('templates', function () {
	return gulp.src('client/templates/*')
		.pipe(gulp.dest('build/templates'));
});

gulp.task('fonts', function (){
	return gulp.src('client/fonts/*')
		.pipe(gulp.dest('build/fonts'));
});

gulp.task('videos', function (){
	return gulp.src('videos/*')
		.pipe(gulp.dest('build/videos'));
});

gulp.task('images', function () {
	return gulp.src('images/*')
		.pipe(gulp.dest('build/images'));
});

gulp.task('clean', function () {
	return del.sync('build');
});

gulp.task('default', function (){
	runSequence('clean', ['bundle', 'fonts', 'templates', 'videos', 'images']);
});