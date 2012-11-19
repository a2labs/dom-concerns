define( [ "backbone", "underscore" ], function ( Backbone, _ ) {

	var BaseView = Backbone.View.extend({
		visualState: function ( state ) {
			if ( typeof state === "string" ) {
				state = { state: state, key: "default" };
			}

			if ( !this.visualStates ) {
				this.visualStates = {};
			}

			if ( this.visualStates[ state.key ] ) {
				this.$el.removeClass( this.visualStates[ state.key ] );
			}

			this.visualStates[ state.key ] = state.state;

			if ( this.visualStates[ state.key ] ) {
				this.$el.addClass( this.visualStates[ state.key ] );
			}
		}
	});

	return BaseView;
});