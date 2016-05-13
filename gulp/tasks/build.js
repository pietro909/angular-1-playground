var config = require("../config");
var gulp = require("gulp");
var $ = require("gulp-load-plugins")(config.loadPluginsOptions);

var args = require("../args");

gulp.task("build", (cb) => {
	var tasksToRun = [
		"lint",
		"scripts"
	];

	if (args.isRelease) {
		return $.runSequence(tasksToRun,
		"build:copy-dist",
		cb);
	}

	return $.runSequence(tasksToRun,
	cb);
});

gulp.task("rebuild", (cb) => {
	return $.runSequence(
		"clean:artifact",
		"build",
		cb);
});

gulp.task("ci", (cb) => {
	return $.runSequence(
		"rebuild",
		"test",
		cb);
});

gulp.task("build:copy-dist", () => {
	return gulp.src([`${config.artifact}/**/*`, `!${config.test.output}/**/*`])
		.pipe(gulp.dest(config.output));
});