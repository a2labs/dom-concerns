define( [ "backbone-app/signup-form-view", "backbone-app/signup-form-model" ], function ( SignupFormView, SignupFormModel ) {

	var app = {
		models: {},
		views: {},
		start: function () {
			app.models.signup    = new SignupFormModel();
			app.views.signupForm = new SignupFormView({ el: ".signup-form", model: app.models.signup });
		}
	};


	return app;
});