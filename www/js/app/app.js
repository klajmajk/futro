/* App Module */

define([
	'angular',
	'angularRoute',
	'angularSanitize',
	'angularAnimate',
	'angularStrapTpl',
	'angularChart',
	'app/filters',
	'app/services',
	'app/directives',
	'app/controllers',
	'dirPagination',
	'textAngular',
	'angularCzech'
], function (angular) {
	'use strict';
	
	return angular.module('kumpanium', [
		'ngRoute',
		'ngSanitize',
		'mgcrea.ngStrap',
		'chart.js',
		'ngAnimate',
		'kumpaniumControllers',
		'kumpaniumFilters',
		'kumpaniumServices',
		'kumpaniumDirectives',
		'angularUtils.directives.dirPagination',
		'textAngular'
	]);
});
