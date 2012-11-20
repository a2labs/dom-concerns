require( "./config" ).runner( global );

var SignupFormView, Backbone;

before( function ( done ) {
	requirejs( [ "backbone", "backbone-app/signup-form-view" ], function ( _Backbone, _SignupFormView ) {
		Backbone = _Backbone;
		SignupFormView = _SignupFormView;
		done();
	});
});

describe( "SignupFormView", function () {
	var signupFormView,
		model;

	beforeEach( function () {
		model = new Backbone.Model();
		signupFormView = new SignupFormView({ model: model });
	});

	it( "should render the template as soon as its created", function () {
		expect( signupFormView.$el.html() ).to.not.be.empty();
	});

	describe( "the password field", function () {
		it( "should render the password field as a password type by default", function () {
			expect( signupFormView.$( "[name=password][type=password]" ).length ).to.be( 1 );
		});

		it( "should switch the password field to a text type when the user checks the Show Password box", function () {
			var passwordField = signupFormView.$( "[name=password][type=password]" );

			passwordField.val( "sample" );
			
			signupFormView.$( ".signup-show-password" ).attr( "checked", "checked" ).change();

			passwordField = signupFormView.$el.find( "[name=password][type=text]" );

			expect( passwordField.length ).to.be( 1 );
			expect( passwordField.val() ).to.be( "sample" );
		});
	});

	describe( "messages", function () {
		it( "should have the correct state of has-errors when there are issues submitting the form", function (){
			model.trigger( "error", model, { "name": "Field is required", "password": "Field is required" } );
			expect( signupFormView.$el.hasClass( "has-errors" ) ).to.be.ok();
		});

		it( "should show error messages", function () {
			model.trigger( "error", model, { "name": "Field is required", "password": "Field is required" } );
			var $errors = signupFormView.$( ".form-errors" );

			expect( $errors ).to.not.be.empty();
			expect( /Name/.test( $errors.html() ) ).to.be.ok();
		});

		it( "should have the correct state of is-successful when the form submission was successful", function (){
			model.trigger( "sync" );
			expect( signupFormView.$el.hasClass( "is-successful" ) ).to.be.ok();
		});
	});
});