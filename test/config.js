module.exports = {
	baseUrl: __dirname + "/../lib",
	paths: {
		template: "../templates/",
		backbone: "../ext/backbone-0.9.2",
		underscore: "../ext/underscore-1.4.2"
	},

	shim: {
		backbone: {
			deps: [ "jquery", "underscore" ],
			exports: "Backbone"
		},
		underscore: {
			exports: "_"
		}
	}
};