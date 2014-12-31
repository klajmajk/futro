'use strict';

/* App Module */

var kumpanium = angular.module('kumpanium', [
	'ngRoute',
	'ngSanitize',
	'kumpaniumControllers',
	'kumpaniumFilters',
	'kumpaniumServices',
	'kumpaniumDirectives',
	'mgcrea.ngStrap',
	'chart.js',
	'ngAnimate'
]);

kumpanium
		.config(['$routeProvider',
			function ($routeProvider) {

				var path = '/partials';

				$routeProvider.
						when('/novinky', {
							title: 'Novinky',
							templateUrl: path + '/news',
							controller: 'newsConstroller'
						}).
						when('/konzumenti', {
							title: 'Konzumenti',
							templateUrl: path + '/users',
							controller: 'usersController'
						}).
						when('/statistiky', {
							title: 'Statistiky',
							templateUrl: path + '/stats',
							controller: 'statsController'
						}).
						when('/zasoby', {
							title: 'Zásoby',
							templateUrl: path + '/stock',
							controller: 'stockController'
						}).
						otherwise({
							redirectTo: '/novinky'
						});
			}])

		.run(function ($rootScope) {
			$rootScope.$on("$routeChangeSuccess", function (event, currentRoute, previousRoute) {
				document.title = currentRoute.title + ' | Kumpanium';
			});
		})
		
		.config(function ($modalProvider) {
			angular.extend($modalProvider.defaults, {
				html: true
			});
		});

function truncateElelment(selector) {
	var element = document.querySelector(selector);
	while (element.lastChild)
		element.removeChild(element.lastChild);
}

