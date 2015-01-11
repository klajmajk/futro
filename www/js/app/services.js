define([
	'angular',
	'app/services/keg',
	'app/services/user',
	'app/services/utils',
	'angularResource'
], function (angular,
		keg,
		user,
		utils
		) {
	'use strict';

	var serviceModule = angular.module('kumpaniumServices', ['ngResource']);

	serviceModule.factory('API', ['$resource',
				function ($resource) {
					var apiPath = '/futro/';

					return function (presenter) {
						var paramDefaults = apiPath + presenter + '/:id/:relation/:relationId';
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

						return api;
					};
				}]);

	keg(serviceModule);
	user(serviceModule);
	utils(serviceModule);
	
	return serviceModule;
});


