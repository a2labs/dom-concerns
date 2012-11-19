var requirejs = require( "requirejs" ),
	expect    = require( "expect.js" ),
	config    = require("./config.js" );

requirejs.config( config );

var SignupFormModel;

before( function ( done ) {
	requirejs( [ "backbone-app/signup-form-model" ], function ( _SignupFormModel ) {
		SignupFormModel = _SignupFormModel;
		done();
	});
});

describe( "SignupFormModel", function () {
	var signupForm, errors;

	beforeEach( function () {
		errors = {};
		signupForm = new SignupFormModel();
		signupForm.on( "error", function ( model, error ) {
			errors = error;
		});
	});

	describe( "When validating", function() {
		it( "should require a name", function () {
			var ret = signupForm.set({ name: "" });
			expect( ret ).to.be( false );
			expect( errors.name ).to.not.be( undefined );
		});

		it( "should require a password", function () {
			var ret = signupForm.set({ password: "" });
			expect( ret ).to.be( false );
			expect( errors.password ).to.not.be( undefined );
		});

		it( "should require a password that is 8 characters or longer", function () {
			var ret = signupForm.set({ password: "short" });
			expect( ret ).to.be( false );
			expect( errors.password ).to.not.be( undefined );
		});

		it( "should succeed with valid data", function () {
			var ret = signupForm.set({
				name: "John Doe",
				password: "overseven"
			});
			expect( ret ).to.not.be( false );
			expect( errors.name ).to.be( undefined );
			expect( errors.password ).to.be( undefined );
		});
	});

	describe( "When saving", function () {
		it( "should emit a sync event upon a successful save", function ( done ) {
			var ret = signupForm.set({
				name: "John Doe",
				password: "overseven"
			});

			var succeed = false;

			signupForm.on( "sync", function () {
				expect( true ).to.be.ok();
				done()
			});
			
			signupForm.save();
		});
	});
});
