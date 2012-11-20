// Ideas from http://blog.rjzaworski.com/2012/07/testing-with-node-jasmine-and-require-js-part-ii/
var jsdom = require( "jsdom" );

var requirejs = require( "requirejs" );


var window = global.window = jsdom.jsdom().createWindow('<html><body></body></html>');
var document = global.document = window.document;
var jQuery = global.jQuery = require( "jquery").create( window );

requirejs.config({
	baseUrl: __dirname + "/../lib",
	paths: {
		template: "../templates/",
		backbone: "../ext/backbone-0.9.2",
		underscore: "../ext/underscore-1.4.2"
	},

	shim: {
		backbone: {
			deps: [ "jquery", "underscore" ],
			exports: "Backbone",
			init: function () {
				this.Backbone.setDomLibrary( jQuery );
			}
		},
		underscore: {
			exports: "_"
		}
	}
});

var makeGlobal = {
	expect: require( "expect.js"),
	requirejs: requirejs,
	jQuery: jQuery,
	window: window,
	document: document
};

module.exports = {
	runner: function ( context ) {
		for ( key in makeGlobal ) {
			context[ key ] = makeGlobal[ key ];
		}
	}
};