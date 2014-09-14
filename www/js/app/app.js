'use strict';

/* App Module */

var futra = angular.module('futra', [
	'ngRoute',
	'ngSanitize',
	'futraControllers',
	'futraFilters',
	'futraServices',
	'futraDirectives',
	'mgcrea.ngStrap',
	'ngAnimate'
]);

var devel = '/futra/www';

futra
	.config(['$routeProvider',
		function($routeProvider) {
			$routeProvider.
				when('/consumption', {
					templateUrl: devel + '/partials/consumption.html',
					controller: 'consumptionCtrl'
				}).
				when('/phones/:phoneId', {
					templateUrl: 'partials/phone-detail.html',
					controller: 'PhoneDetailCtrl'
				}).
				otherwise({
					redirectTo: '/consumption'
				});
		}])
	
	.config(['$popoverProvider',
		function($popoverProvider) {
			angular.extend($popoverProvider.defaults, {
				html: true
			});
		}])
	
	.config(['$modalProvider',
		function($modalProvider) {
			angular.extend($modalProvider.defaults, {
				html: true
			});
		}]);