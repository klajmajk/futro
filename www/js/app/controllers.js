define([
	'angular',
	'app/controllers/news',
	'app/controllers/stats',
	'app/controllers/stock',
	'app/controllers/user'
], function (angular,
		news,
		stats,
		stock,
		user
		) {
	'use strict';

	var controllerModule = angular.module('kumpaniumControllers', []);

	news(controllerModule);
	stats(controllerModule);
	stock(controllerModule);
	user(controllerModule);

	controllerModule.run(['$rootScope', '$window', 'User',
		function ($rootScope, $window, User) {
			$rootScope.isManager = $window.isManager;
			$rootScope.usersById = {};
			$rootScope.users = User.query(function (users) {
				var i = users.length;
				while (i--)
					$rootScope.usersById[users[i].id] = users[i];
			});
		}]);

	return controllerModule;
});