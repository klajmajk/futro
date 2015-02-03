'use strict';

require.config({
	baseUrl: 'js/vendor',	
	paths: {
		app:				'../app',
		angular:			'//ajax.googleapis.com/ajax/libs/angularjs/1.3.11/angular.min',
		angularRoute:		'//ajax.googleapis.com/ajax/libs/angularjs/1.3.11/angular-route.min',
		angularAnimate:		'//ajax.googleapis.com/ajax/libs/angularjs/1.3.11/angular-animate.min',
		angularResource:	'//ajax.googleapis.com/ajax/libs/angularjs/1.3.11/angular-resource.min',
		angularSanitize:	'//ajax.googleapis.com/ajax/libs/angularjs/1.3.11/angular-sanitize.min',
		angularStrap:		'//cdnjs.cloudflare.com/ajax/libs/angular-strap/2.1.6/angular-strap.min',
		angularStrapTpl:	'//cdnjs.cloudflare.com/ajax/libs/angular-strap/2.1.6/angular-strap.tpl.min',
		angularChart:		'chart/angular-chart',
		textAngular:		'//cdnjs.cloudflare.com/ajax/libs/textAngular/1.2.2/textAngular.min',
		angularCzech:		'i18n/angular-locate_cs-cz'
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
		dirPagination: ['angular'],
		textAngular: ['angular', 'rangy.min'],
		angularCzech: ['angular']
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
