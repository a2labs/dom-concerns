define( [ "underscore" ], function( _ ) {

	var ValidationMixin = {
		// Accepts either a key and value pair,
		// or a object literal with key/value pairs
		validate: function ( key, value ) {
			var fields = {};
			var errors = {};
			var single = false;

			if ( typeof key === "string" ) {
				fields[ key ] = value;
				single = true;
			} else {
				fields = key;
			}

			_.each( fields, function ( val, key ) {
				var validation = this.validations[ key ];
				if ( validation ) {
					if ( ( validation === true || validation.required ) && !val ) {
						errors[ key ] = "Field is required";
						return;
					}

					if ( validation.custom ) {
						var test = validation.custom( val );
						if ( test !== true ) {
							errors[ key ] = test;
							return;
						}
					}
				}
			}, this);

			if ( !_.isEmpty( errors ) ) {
				if ( single ) {
					return errors[ key ];
				} else {
					return errors;
				}
			}
		}
	};

	return ValidationMixin;
});