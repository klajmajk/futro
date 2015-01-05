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

	var ctrl = angular.module('kumpanium.controllers', []);

	news(ctrl);
	stats(ctrl);
	stock(ctrl);
	user(ctrl);

	ctrl.run(function ($rootScope, $window, User) {
		$rootScope.isManager = $window.isManager;
		$rootScope.usersById = {};
		$rootScope.users = User.query(function (users) {
			var i = users.length;
			while (i--)
				$rootScope.usersById[users[i].id] = users[i];
		});
		$rootScope.checkAll = function (objects, action) {
			var i = objects.length;
			while (i--)
				objects[i].checked = !!action;
		};
	});

	return ctrl;
});