define( [ "backbone-app/form-view", "backbone-app/form-view-dom" ], function ( FormView, FormViewDom ) {

	var app = {
		// observers exposed for development
		observers: {},
		views: {},
		start: function () {
			app.views.formView = new FormView({ el: ".signup-form" });
			app.observers.formView = new FormViewDom( {
				observe: app.views.formView,
				element: app.views.formView.$el
			});

			app.views.formView.render();
		}
	};


	return app;
});