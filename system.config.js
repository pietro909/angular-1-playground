System.config({
	baseURL: "/",
	defaultJSExtensions: true,
    transpiler: "none",

	paths: {
		"github:*": "jspm_packages/github/*",
		"npm:*": "jspm_packages/npm/*",
		"bower/*": "bower_components/*"
	},

	meta: {
		"angular": {
			format: "global"
		}
	},

	map: {
		"angular": "bower/angular/angular"
	}
});
