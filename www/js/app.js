/* App Module */
angular.module('kumpanium', [
	'ngRoute',
	'ngSanitize',
	'mgcrea.ngStrap',
	'chart.js',
	'kumpaniumControllers',
	'kumpaniumFilters',
	'kumpaniumServices',
	'kumpaniumDirectives',
	'angularUtils.directives.dirPagination',
	'textAngular'
]);

angular.module('kumpaniumFilters', []);
angular.module('kumpaniumServices', ['ngResource']);
angular.module('kumpaniumDirectives', ['kumpaniumServices']);
angular.module('kumpaniumControllers', []);

angular.element(document).ready(function() {
	angular.bootstrap(document, ['kumpanium']);
});

