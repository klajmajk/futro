define([], function () {
	'use strict';

	return function (serviceModule) {
		serviceModule.factory('API', ['$resource',
			function ($resource) {
				var apiPath = '/futro/';

				return function (presenter, id, relation) {
					var paramDefaults = apiPath +
							(presenter || ':presenter') + '/' +
							(id || ':id') + '/' +
							(relation || ':relation') +
							'/:relationId';
					var api = $resource(paramDefaults, {id: '@id'}, {
						update: {method: 'PUT'},
						get: {method: 'GET', cache: true, params: {outputAssoc: 1}},
						query: {method: 'GET', cache: true, isArray: true}
					});

					api.prototype.currentDateTime = function () {
						var now = new Date(),
								tzo = -now.getTimezoneOffset(),
								dif = tzo >= 0 ? '+' : '-',
								pad = function (num) {
									var norm = ~~num;
									return norm < 10 ? '0' + norm : norm;
								};
						return now.getFullYear()
								+ '-' + pad(now.getMonth() + 1)
								+ '-' + pad(now.getDate())
								+ 'T' + pad(now.getHours())
								+ ':' + pad(now.getMinutes())
								+ ':' + pad(now.getSeconds())
								+ dif + pad(tzo / 60)
								+ ':' + pad(tzo % 60);
					};
					
					api.prototype.confirmDelete = function (message, successCallback, errorCallback) {
						message = message || 'Opravdu smazat položku ID: ' + this.id;
						if (confirm(message))
							this.$delete(successCallback, errorCallback);
					};

					return api;
				};
			}]);
	};
});
