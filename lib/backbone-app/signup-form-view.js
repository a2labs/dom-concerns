define( [ 
	"underscore",
	"jquery",
	"backbone-app/base-view",
	"backbone-app/form-mixin",
	"text!template/signup-form.html",
	"text!template/errors.html" ], function ( _, $, BaseView, FormMixin, template, errorTemplate ) {

	var FormView = BaseView.extend({
		showPassword: false,

		template: _.template( template ),
		errorTemplate: _.template( errorTemplate ),

		events: {
			"submit form": "handleSubmit",
			"change .signup-show-password": "togglePassword"
		},

		initialize: function () {
			_.bindAll( this, "render", "signupSuccess", "signupValid", "signupError" );
			this.delegateEvents( this.events );

			this.model.on( "sync",   this.signupSuccess );
			this.model.on( "change", this.signupValid );
			this.model.on( "error",  this.signupError );
			this.render();
		},

		render: function () {
			var html = this.template({ _prefix: this.cid });

			this.$el.html( html );
			this.initializeForm();
		},

		handleSubmit: function ( e ) {
			e.preventDefault();
			if ( this.model.set( this.getFormData() ) ) {
				this.model.save();
			}
		},

		displayErrors: function ( errors ) {
			if ( !this.$errors ) {
				this.$errors = this.$( ".form-errors" );
			}

			var errorOutput = { global: errors.global, fields: [] };

			_.each( errors.fields, function ( error, key ) {
				errorOutput.fields.push({label: this.fields[ key ].label, message: error });
			}, this );

			this.$errors.html( this.errorTemplate( errorOutput ));
		},

		// We can not simply swap out the `type` attribute,
		// as old version of IE will fail. We need to swap out
		// the entire element.
		togglePassword: function () {
			this.showPassword = !this.showPassword;
			var view = this.view;


			var oldValue = this.fields.password.$el.val();

			var $newField = $( "<input>", {
				type: this.showPassword ? "text" : "password",
				id: this.cid + "Password",
				"class": "signup-password",
				value: oldValue,
				name: "password"
			});

			this.fields.password.$el.replaceWith( $newField );
			this.fields.password.$el = $newField;
		},

		signupError: function ( model, errors ) {
			this.visualState( "has-errors" );

			this.displayErrors({
				global: "There was a problem submitting this form. Please correct the errors and try again.",
				fields: errors
			});
		},

		signupValid: function () {
			this.visualState( "" );
		},

		signupSuccess: function () {
			this.visualState( "is-successful" );
		}
	});

	_.extend( FormView.prototype, FormMixin );

	return FormView;
});