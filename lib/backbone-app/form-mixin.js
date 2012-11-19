define( [ "jquery", "underscore" ], function ( $, _ ) {
	// This is just a proof of concept, it has several glaring errors
	// for instance: checkbox and radio support is not present
	var FormMixin = {
		// The idea here is to not need to query the DOM again
		getFormData: function () {
			var data = {};

			_.each( this.fields, function ( field, name ) {
				data[ name ] = field.$el.val();
			});

			return data;
		},
		initializeForm: function () {
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
		}
	};


	return FormMixin;
});