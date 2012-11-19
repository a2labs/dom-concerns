define( [ "backbone", "underscore", "backbone-app/validation-mixin" ], function( Backbone, _, ValidationMixin ) {

	var SignupFormModel = Backbone.Model.extend({
		defaults: {
			name: "",
			password: ""
		},
		validations: {
			"name": true,
			"password": {
				required: true,
				custom: function ( value ) {
					return value.length > 7 ? true : "Password must be 8 characters or longer."
				}
			}
		},
		save: function () {
			// Fake stub to trigger event
			this.trigger( "sync" );
		}
	});


	_.extend( SignupFormModel.prototype, ValidationMixin );

	return SignupFormModel;
});