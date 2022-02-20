(function ( $ ) {
	'use strict';

	$( window ).on(
		'elementor/frontend/init',
		function () {
			qodefElementor.init();
		}
	);

	var qodefElementor = {
		init: function () {
			var isEditMode = Boolean( elementorFrontend.isEditMode() );

			if ( isEditMode ) {
				for ( var key in qodefCore.shortcodes ) {
					for ( var keyChild in qodefCore.shortcodes[key] ) {
						qodefElementor.reInitShortcode(
							key,
							keyChild
						);
					}
				}
			}
		},
		reInitShortcode: function ( key, keyChild ) {
			elementorFrontend.hooks.addAction(
				'frontend/element_ready/' + key + '.default',
				function ( e ) {
					// Check if object doesn't exist and print the module where is the error
					if ( typeof qodefCore.shortcodes[key][keyChild] === 'undefined' ) {
						console.log( keyChild );
					} else if ( typeof qodefCore.shortcodes[key][keyChild].createSlider === 'function' && e.find( '.qodef-swiper-container' ).length ) {
						var $sliders = e.find( '.qodef-swiper-container' );
						if ( $sliders.length ) {
							$sliders.each(
								function () {
									qodefCore.shortcodes[key][keyChild].createSlider( $( this ) );
								}
							);
						}
					} else if ( typeof qodefCore.shortcodes[key][keyChild].initItem === 'function' && e.find( '.qodef-shortcode' ).length ) {
						qodefCore.shortcodes[key][keyChild].initItem( e.find( '.qodef-shortcode' ) );
					} else {
						qodefCore.shortcodes[key][keyChild].init();
					}
				}
			);
		},
	};

})( jQuery );
