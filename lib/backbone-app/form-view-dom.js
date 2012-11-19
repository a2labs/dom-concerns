define( [
	"jquery",
	"underscore",
	"backbone",
	"text!template/signup-form.html",
	"text!template/errors.html",
], function ( $, _, Backbone, template, errorTemplate ) {

	var FormViewDom = function ( options ) {
		this.options = _.defaults( options, FormViewDom.defaults );
		this.view = this.options.observe;
		this.$el = this.options.element;
		this.$ = this.view.$;
		this.initialize();
	};

	FormViewDom.defaults = {

	};

	_.extend( FormViewDom.prototype, {
		template: _.template( template ),
		errorTemplate: _.template( errorTemplate ),
		
		showPassword: false,
		labels: {},

		// TODO: this will break if its changed across instances
		events: {
			"submit form": "handleSubmit",
			"change .signup-show-password": "togglePassword"
		},

		initialize: function () {
			_.bindAll( this, "firstRender", "signupSuccess", "signupError", "signupValid" );
			this.delegateEvents( this.events );

			this.view.on( "render", this.firstRender );
			this.view.on( "signup.complete", this.signupSuccess );
			this.view.on( "signup.inputerror", this.signupError );
			this.view.on( "signup.valid", this.signupValid );
		},

		handleSubmit: function ( e ) {
			e.preventDefault();

			var values = this.$( "form" ).serializeArray();
			var data = {};

			_.each( values, function ( pair ) {
				data[ pair.name ] = pair.value;
			});

			this.view.trigger( "signup", data );
		},

		displayErrors: function ( errors ) {
			if ( !this.$errors ) {
				this.$errors = this.$( ".form-errors" );
			}

			_.each( errors.fields, function ( error ) {
				error.label = this.fields[ error.field ].label;
			}, this );

			this.$errors.html( this.errorTemplate( errors ));
		},

		togglePassword: function () {
			this.showPassword = !this.showPassword;
			var view = this.view;

			if ( !this.$passwordField ) {
				this.$passwordField = this.$( ".signup-password" );
			}

			var oldValue = this.$passwordField.val();

			var $newField = $( "<input>", {
				type: this.showPassword ? "text" : "password",
				id: view.cid + "Password",
				"class": "signup-password",
				value: oldValue,
				name: "password"
			});

			this.$passwordField.replaceWith( $newField );
			this.$passwordField = $newField;
		},

		firstRender: function () {
			var view = this.view;
			var html = this.template({ _prefix: view.cid });

			view.$el.html( html )
			view.off( "render", this.firstRender );
			this.cacheFormElements();
		},

		cacheFormElements: function () {
			var fields = this.fields = {};
			this.$( 'input, textarea, select' ).each( function ( i, el ) {
				if ( el.name ) {
					fields[ el.name ] = {
						id: el.id,
						$el: $( el )
					};
				}
			});

			this.$( 'label' ).each( function ( i, el ) {
				var $label = $( el );
				var target = $label.attr( "for" );
				var input  = _.find( fields, function ( field ) {
					return field.id === target;
				});
				if ( input ) {
					input.label = $label.html();
					input.$label = $label;
				}
			});
		},

		signupError: function ( errors ) {
			this.$el.addClass( "has-errors" );
			this.displayErrors( errors );
		},

		signupValid: function () {
			this.$el.removeClass( "has-errors" );
		},

		signupSuccess: function () {
			this.$el.addClass( "is-successful" );
		}
	}, {
		delegateEvents: Backbone.View.prototype.delegateEvents,
		undelegateEvents: Backbone.View.prototype.undelegateEvents
	});

	return FormViewDom;
});