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
], function (angular) {
	'use strict';
	
	return angular.module('kumpanium', [
		'ngRoute',
		'ngSanitize',
		'mgcrea.ngStrap',
		'chart.js',
		'ngAnimate',
		'kumpanium.controllers',
		'kumpanium.filters',
		'kumpanium.services',
		'kumpanium.directives'
	]);
});
