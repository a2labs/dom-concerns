define( [ "backbone", "underscore" ], function ( Backbone, _ ) {

	var FormView = Backbone.View.extend({
		showPassword: false,

		validations: {
			"name": {
				required: true
			},
			"password": {
				required: true,
				custom: function ( value ) {
					return value.length > 7 ? true : "Password must be 8 characters or longer."
				}
			}
		},

		initialize: function () {
			_.bindAll( this, "processSignup" );
			this.on( "signup", this.processSignup );
		},

		render: function () {
			this.trigger( "render" );
		},

		validateData: function ( data ) {
			var errors = { global: "", fields: [] },
				hasError = false;
			_.each( data, function ( val, key ) {
				var validation = this.validations[ key ];
				if ( validation ) {
					if ( validation.required && !val ) {
						errors.fields.push( { field: key, message: "Field is required" } );
						hasError = true;
						return;
					}

					if ( validation.custom ) {
						var test = validation.custom( val );
						if ( test !== true ) {
							errors.fields.push( { field: key, message: test } );
							hasError = true;
							return;
						}
					}
				}
			}, this);

			if ( hasError ) {
				errors.global = "There were errors that prevented this form from being submitted. Please correct these errors before trying again.";
				return errors;
			} else {
				return true;
			}
		},

		// Data has serialized form data
		processSignup: function ( data ) {
			var validate = this.validateData( data );
			if ( validate === true ) {
				this.trigger( "signup.valid" );
				console.log( "submit form" );
				this.trigger( "signup.complete" );
			} else {
				this.trigger( "signup.inputerror", validate );
			}
		}
	});

	return FormView;
});