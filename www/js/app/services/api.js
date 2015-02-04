define([], function () {
	'use strict';

	return function (serviceModule) {
		serviceModule.factory('API', [
			'$resource', 'Utils',
			function ($resource, Utils) {
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
						return Utils.dateToISO();
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
