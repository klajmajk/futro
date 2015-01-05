// http://jtblin.github.io/angular-chart.js/

define([
	'app/services'
], function () {
	'use strict';

	return function (ctrl) {
		ctrl.controller('StatsController', ['$scope',
				function ($scope) {
					$scope.tabs = [
						{
							title: 'Konzumace',
							content: '<canvas id="bar" class="chart chart-bar" data="data" labels="labels"></canvas>',
							controller: userStatController
						}
					];
					$scope.tabs.activeTab = 0;
				}]);
		};

	function userStatController($scope, User) {
		$scope.labels = [];
		$scope.data = [[]];

		User.query(function (users) {
			var i = users.length;
			while (i--) {
				$scope.labels.push(users[i].name);
				$scope.data[0].push(users[i].balance);
			}
		});
	}
	
});