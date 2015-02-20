angular.module('kumpanium')
		.config([
			'$routeProvider',
			function ($routeProvider) {
				'use strict';
				
				var path = '/partials';

				$routeProvider.
						when('/novinky', {
							title: 'Novinky',
							templateUrl: path + '/news',
							controller: 'NewsController'
						}).
						when('/konzumenti', {
							title: 'Konzumenti',
							templateUrl: path + '/users',
							controller: 'UsersController'
						}).
						when('/statistiky', {
							title: 'Statistiky',
							templateUrl: path + '/stats',
							controller: 'StatsController'
						}).
						when('/zasoby', {
							title: 'Zásoby',
							templateUrl: path + '/stock',
							controller: 'StockController'
						}).
						otherwise({
							redirectTo: '/novinky'
						});
			}])

		.run(['$rootScope', function ($rootScope) {
				$rootScope.$on("$routeChangeSuccess", function (event, currentRoute, previousRoute) {
					document.title = currentRoute.title + ' | ' + 'Kumpanium';
				});
			}]);
