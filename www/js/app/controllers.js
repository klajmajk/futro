'use strict';

var futraControllers = angular.module('futraControllers', []);

futraControllers.controller('consumptionCtrl', ['$scope', '$timeout', 'API',
	function($scope, $timeout, API) {
		var gap = 8 * 60 * 60 * 1000 * 1000;
		var vytoc = API.get({presenter: 'vytoc'}),
			sudy = API.get({presenter: 'sud'});

		$scope.Consumers = {
			list: API.query({presenter: 'kumpan'}),
			isActive: function(consumer) {
				// last beer not longer than {gap} hours ago
				return Date.now() - consumer.last_beer < gap;
			},
			selected: {},
			new: false,
			addNew: function() {
				if (this.new) {
					this.list.push({
						alias: this.new,
						privileges: 4,
						last_beer: null,
						id_kumpan: 10
					});
					this.selected[10] = true;
				}
				this.new = false;
			}
		};

		$scope.consumption = vytoc;
		$scope.kegs = sudy;
		$scope.popover = {
			title: 'Hi there!',
			content: 'This is test of <br /> angular directives'
		};
	}]);

