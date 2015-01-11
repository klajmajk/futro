// http://jtblin.github.io/angular-chart.js/

define([
	'app/services'
], function () {
	'use strict';

	return function (ctrl) {
		ctrl.controller('NewsController', ['$scope', 'API', '$q', '$rootScope', 'User',
			function ($scope, API, $q, $rootScope, User) {
				$q.all([API('news').query().$promise, $rootScope.users.$promise]).then(function (data) {
					var news = data[0];
					var i = news.length;
					while (i--) {
						var user = $rootScope.usersById[news[i].user];
						news[i].user = {
							name: user.name,
							context: user.getRole().context
						};
					}

					$scope.news = news;
				});
			}]);
	};

});