'use strict';

/* Services */

var futraServices = angular.module('futraServices', ['ngResource']);

var devel = '/futra/www';

futraServices
		.factory('API', ['$resource',
			function($resource) {
				return $resource(devel + '/api/v1/:presenter', {}, {
				});
			}]);
