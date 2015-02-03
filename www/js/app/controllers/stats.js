define([
	'app/services'
], function () {
	'use strict';

	return function (ctrl) {
		ctrl.controller('StatsController', [
			'$scope', 'User', '$http', 'User',
			function ($scope, $http, User) {
				// http://jtblin.github.io/angular-chart.js/
				var chartTypes = ['Bar', 'Doughnut', 'Line', 'Pie', 'PolarArea', 'Radar'];

				$scope.chartControl = {
					chart: {},
					form: {},
					type: {
						Bar: {label: 'stav'},
						Line: {label: 'vývoj'},
						Pie: {label: 'podíl'}
					},
					labels: {
						user: {label: 'lidí', col: 'name'},
						beer: {label: 'piva', col: 'name'}
					},
					data: {
						consumption: {label: 'výtoč'},
						credit: {label: 'útratu'}
					},
					plot: function () {
						var chart = this.chart;
						$scope.chart.type = chart.type;
						
						var query = '/futro/stat?labels=' + chart.labels + '&data=' + chart.dat;
						if (chart.dateBegin)
							query += '&dateBegin=' + chart.dateBegin;
						if (chart.dateEnd)
							query += '&dateBegin=' + chart.dateEnd;

						$http.get(query)
								.success(function (data, status, headers, config) {

								}).
								error(function (data, status, headers, config) {

								});
					},
					init: function() {
						this.chart = {
							type: 'Bar',
							labels: 'user',
							data: 'beer',
							dateBegin: (new Date().getFullYear()) + '-01-01T00:00:00+01:00'
						};
						this.plot();
					}
				};

				$scope.chart = {
					labels: [],
					data: [[]],
					legend: false,
					series: [],
					type: chartTypes[0],
					clear: function () {
						this.labels = [];
						this.data = [[]];
					}
				};
			}]);
	};

});