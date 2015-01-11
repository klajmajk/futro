define([
	'angular',
	'app/services'
], function (angular) {
	'use strict';
	
	return angular.module('kumpaniumDirectives', ['kumpaniumServices'])
	
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

			.directive('cacheTemplate', function ($templateCache) {
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

			.directive('compile', function ($compile) {
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
			})

			.directive('showErrors', function () {
				return {
					restrict: 'A',
					require: 'form',
					link: function (scope, el, attrs, formCtrl) {
						var formGroups = el[0].getElementsByClassName('form-group'),
								i = formGroups.length,
								fields = {};

						if (i === 0)
							return;
						while (i--) {
							var input = formGroups[i].querySelector('[name]');
							if (!input)
								continue;
							var inputElem = angular.element(input);
							fields[inputElem.attr('name')] = angular.element(formGroups[i]);
							inputElem.bind('change', function () {
								checkValidity(this.getAttribute('name'));
							});
						}

						scope.$on('show-errors-check-validity', function () {
							for (var name in fields)
								if (fields.hasOwnProperty(name))
									checkValidity(name);
						});

						function checkValidity(name) {
							fields[name].toggleClass('has-error', formCtrl[name].$invalid);
						}
					}
				};
			})

			.directive('validPhone', function () {
				return {
					require: 'ngModel',
					link: function (scope, el, attrs, ctrl) {
						ctrl.$validators.phone = function (modelValue, viewValue) {
							if (ctrl.$isEmpty(modelValue))
								return true;
							if (isNaN(modelValue))
								return false;
							var numberLength = modelValue.replace(/(^00)|\D/g, '').length;
							if (numberLength > 12 || numberLength < 9)
								return false;
							return true;
						};
					}
				};
			})

			// TODO: not used, just copied from https://docs.angularjs.org/guide/forms
			.directive('usernameExists', function () {
				return {
					require: 'ngModel',
					link: function (scope, el, attrs, ctrl) {
						var usernames = ['Jim', 'John', 'Jill', 'Jackie'];

						ctrl.$asyncValidators.username = function (modelValue, viewValue) {

							if (ctrl.$isEmpty(modelValue)) {
								// consider empty model valid
								return $q.when();
							}

							var def = $q.defer();

							$timeout(function () {
								// Mock a delayed response
								if (usernames.indexOf(modelValue) === -1) {
									// The username is available
									def.resolve();
								} else {
									def.reject();
								}

							}, 2000);

							return def.promise;
						};
					}
				};
			});
});



    