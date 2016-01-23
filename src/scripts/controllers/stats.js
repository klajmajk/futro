angular.module('kumpaniumControllers').controller('StatsController', [
	'$scope', '$http', 'Utils',
	function ($scope, $http, Utils) {
		'use strict';
		
		// http://jtblin.github.io/angular-chart.js/
		var chartTypes = ['Bar', 'Doughnut', 'Line', 'Pie', 'PolarArea', 'Radar'];

		$scope.chart = {
			labels: [],
			data: [],
			series: [],
			type: chartTypes[0],
			clear: function () {
				this.labels = [];
				this.series = [];
				this.data = [];
			}
		};

		$scope.chartControl = {
			chart: {},
			form: {},
			type: [
				{value: 'Bar', label: 'stav'},
				{value: 'Line', label: 'vývoj'},
				{value: 'Pie', label: 'podíl'}
			],
			series: [
				{value: 'user', label: 'lidí'},
				{value: 'beer', label: 'piva'}
			],
			data: [
				{value: 'consumption', label: 'výtoč [L]'},
				{value: 'credit', label: 'útratu [Kč]'}
			],
			response: {},
			load: function () {
				var my = this,
					chart = this.chart;

				var query = '/futro/stat?data=' + chart.data + '&series=' + chart.series;
				if (chart.dateBegin)
					query += '&dateBegin=' + Utils.dateToISO(chart.dateBegin);
				if (chart.dateEnd)
					query += '&dateEnd=' + Utils.dateToISO(chart.dateEnd);


				$http.get(query)
						.success(function (data) {
							my.response = data;
							my.plot();
						})
						.error(function (data) {

						});
			},
			plot: function () {
				var chart = $scope.chart,
						length = this.response.length;
				if (length === 0)
					return;

				chart.clear();
				var data = chart.data,
						item, temp = {};
				switch (chart.type = this.chart.type) {
					case 'Bar':
						chart.data.push([]);
						data = chart.data[0];
					case 'Pie':
						for (var i = 0; i < length; i++) {
							item = this.response[i];
							if (typeof temp[item.series] === 'undefined')
								temp[item.series] = 0;
							temp[item.series] += item.data;
						}

						for (var label in temp) {
							chart.labels.push(label);
							data.push(temp[label]);
						}

						for (var i = 0, l = data.length; i < l; i++)
							data[i] = +data[i].toFixed(2);
						break;
					case 'Line':
						var series = {}, previous;
						for (var i = 0; i < length; i++) {
							item = this.response[i];
							if (typeof temp[item.date] === 'undefined')
								temp[item.date] = {};
							temp[item.date][item.series] = item.data;
							series[item.series] = true;
						}

						for (var serie in series)
							chart.series.push(serie);

						for (var date in temp) {
							chart.labels.push(date);
							for (var i = 0, l = chart.series.length; i < l; i++) {
								serie = chart.series[i];
								if (typeof data[i] === 'undefined')
									data.push([]);
								previous = data[i][data[i].length - 1] || 0;
								data[i].push(+(previous + (temp[date][serie] || 0)).toFixed(2));
							}
						}
						break;
				}

			},
			init: function () {
				var d = new Date();
				d.setMonth(0);
				d.setDate(1);
				d.setHours(0);
				d.setMinutes(0);
				d.setFullYear(2015);

				this.chart = {
					type: 'Bar',
					series: 'user',
					data: 'consumption',
					dateBegin: d
				};
				this.load();
			}
		};
		$scope.chartControl.init();
	}]);