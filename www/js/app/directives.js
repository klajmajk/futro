'use strict';

/* Directives */

var kumpaniumDirectives = angular.module('kumpaniumDirectives', ['kumpaniumServices']);

kumpaniumDirectives

		.directive('setFocusIf', function ($timeout) {
			return {
				scope: {trigger: '@setFocusIf'},
				link: function (scope, element) {
					scope.$watch('trigger', function (value) {
						if (value === "true") {
							$timeout(function () {
								element[0].focus();
							});
						}
					});
				}
			};
		})
		
		.directive('cacheTemplate', function($templateCache) {
			return {
				restrict: 'A',
				priority: 100,
				terminal: true,
				link: function (scope, element, attrs) {
					var cacheKey = attrs.cacheTemplate;
					var content = $templateCache.get(cacheKey);
					if (!content || content !== element[0].innerHTML)
						$templateCache.put(cacheKey, element[0].innerHTML);
					
					element.remove();
				}
			};
		})

		.directive('compile', ['$compile', function ($compile) {
				return {
					restrict: 'A',
					link: function (scope, element, attrs) {
						var ensureCompileRunsOnce = scope.$watch(
								function (scope) {
									return scope.$eval(attrs.compile);
								},
								function (value) {
									element.html(value);
									$compile(element.contents())(scope);
									ensureCompileRunsOnce();
								}
						);
					}
				};
			}]);
    