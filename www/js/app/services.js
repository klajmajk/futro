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

	api(serviceModule);
	keg(serviceModule);
	user(serviceModule);
	utils(serviceModule);
	
	return serviceModule;
});


