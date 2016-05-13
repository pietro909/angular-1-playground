var config = require("../config");
var gulp = require("gulp");
var $ = require("gulp-load-plugins")(config.loadPluginsOptions);

gulp.task("scripts", (cb) => {
	return $.runSequence(
		["compile:ts", "compile:dts"],
		cb);
});

gulp.task("compile:ts", () => {
	const tsProject = getTscOptions();
	const tsResult = gulp.src([config.src.tsd, config.src.ts, `!${config.test.files}`])
		.pipe($.plumber())
		.pipe($.sourcemaps.init())
		.pipe($.typescript(tsProject));

	return $.merge2([
		tsResult.js
			.pipe($.ngAnnotate())
			.pipe($.sourcemaps.write("."))
			.pipe(gulp.dest(`${config.artifact}/amd`))
	]);
});

// d.ts generation using dts-generator
gulp.task("compile:dts", () => {
	return $.dtsGenerator.default({
		name: `${config.packageName}`,
		baseDir: `${config.root}/`,
		files: ["./index.ts", `../${config.src.tsd}`],
		out: `${config.artifact}/${config.packageName}.d.ts`,
		main: `${config.packageName}/index`,
	}, (msg) => {
		console.log(`Generating ${config.packageName}.d.ts: ${msg}`);
	});
});

function getTscOptions() {
	return $.typescript.createProject("tsconfig.json", {
		typescript: require("typescript")
	});
}