'use strict';

require.config({
	baseUrl: 'js/vendor',	
	paths: {
		app:				'../app',
		angular:			'//ajax.googleapis.com/ajax/libs/angularjs/1.3.8/angular.min',
		angularRoute:		'//ajax.googleapis.com/ajax/libs/angularjs/1.3.8/angular-route.min',
		angularAnimate:		'//ajax.googleapis.com/ajax/libs/angularjs/1.3.8/angular-animate.min',
		angularResource:	'//ajax.googleapis.com/ajax/libs/angularjs/1.3.8/angular-resource.min',
		angularSanitize:	'//ajax.googleapis.com/ajax/libs/angularjs/1.3.8/angular-sanitize.min',
		angularStrap:		'//cdnjs.cloudflare.com/ajax/libs/angular-strap/2.1.5/angular-strap.min',
		angularStrapTpl:	'//cdnjs.cloudflare.com/ajax/libs/angular-strap/2.1.5/angular-strap.tpl.min',
		angularChart:		'chart/angular-chart'
	},
	shim: {
		angular : {exports : 'angular'},
		angularRoute: ['angular'],
		angularAnimate: ['angular'],
		angularResource: ['angular'],
		angularSanitize: ['angular'],
		angularStrap: ['angular'],
		angularStrapTpl: ['angularStrap'],
		angularChart: ['angular','chart/chart.min'],
		dirPagination: ['angular']
	},
	priority: [
		'angular'
	]
});


require([
	'angular',
	'app/app',
	'app/routes',
	'app/configs'
], function (angular) {
	angular.bootstrap(document, ['kumpanium']);
});
