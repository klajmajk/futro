define([
	'angular',
	'app/services/api',
	'app/services/keg',
	'app/services/user',
	'app/services/utils',
	'angularResource'
], function (angular,
		api,
		keg,
		user,
		utils
		) {
	'use strict';

	var serviceModule = angular.module('kumpaniumServices', ['ngResource']);

	utils(serviceModule);
	api(serviceModule);
	keg(serviceModule);
	user(serviceModule);
	
	return serviceModule;
});


