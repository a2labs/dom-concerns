var requirejs = require( "requirejs" ),
	expect    = require( "expect.js" ),
	config    = require("./config.js" );

requirejs.config( config );

var ValidationMixin, _;

before( function ( done ) {
	requirejs( [ "backbone-app/validation-mixin", "underscore" ], function ( _ValidationMixin, underscore ) {
		ValidationMixin = _ValidationMixin;
		_ = underscore;
		done();
	});
});

describe( "Validation Mixin", function () {
	var sampleObject;

	it( "should expose a validate method", function () {
		expect( ValidationMixin.validate ).to.not.be( undefined );
	});

	it( "should validate required fields", function () {
		var test = {
			validations: {
				name: true,
				password: {
					required: true
				}
			}
		};

		_.extend( test, ValidationMixin );

		var ret = test.validate({});

		expect( ret ).to.not.be( true );
		expect( ret.name ).to.not.be( undefined );
		expect( ret.password ).to.not.be( undefined );
	});

	it( "should validate custom callbacks", function () {
		var test = {
			validations: {
				salary: {
					custom: function ( value ) {
						if ( value < 10000 ) {
							return "Salary too low. Must be 10,000 or higher";
						}

						if ( value > 100000 ) {
							return "Salary too high. Must be lower than or equal to 100,000";	
						}

						return true;
					}
				}
			}
		};

		_.extend( test, ValidationMixin );

		// Testing too low
		var ret = test.validate({ salary: 6000 });

		expect( ret ).to.not.be( true );
		expect( ret.salary ).to.not.be( undefined );

		// Testing Correct
		ret = test.validate({ salary: 50000 });

		expect( ret ).to.be( undefined );
	});
});