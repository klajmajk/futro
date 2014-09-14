'use strict';

/* Directives */

var futraDirectives = angular.module('futraDirectives', ['futraServices']);

futraDirectives
		.directive('setFocusIf', function($timeout) {
			return {
				scope: {trigger: '@setFocusIf'},
				link: function(scope, element) {
					scope.$watch('trigger', function(value) {
						if (value === "true") {
							$timeout(function() {
								element[0].focus();
							});
						}
					});
				}
			};
		});
    