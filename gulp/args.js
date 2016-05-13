var yargs = require("yargs");

var argv = yargs
	.alias("rel", "release")
	.default("rel", false)

	.choices("bump", "major|minor|patch|prerelease".split("|"))
	.default("bump", "patch")

	.default("versionSuffix", "rc")

	.argv;

module.exports = {
	bump: argv.bump,
	versionSuffix: argv.versionSuffix.toLowerCase(),
	isRelease: argv.rel
};