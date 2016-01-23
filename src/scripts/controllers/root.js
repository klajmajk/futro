angular.module('kumpaniumControllers').run([
	'$rootScope', '$window', 'User',
	function ($rootScope, $window, User) {
		'use strict';

		$rootScope.isManager = $window.isManager;
		$rootScope.currentUser = $window.currentUser;
		$rootScope.usersById = {};
		$rootScope.users = User.query(function (users) {
			var i = users.length;
			while (i--)
				$rootScope.usersById[users[i].id] = users[i];
		});
	}]);