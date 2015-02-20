/* App Module */
angular.module('kumpanium', [
	'ngRoute',
	'ngSanitize',
	'mgcrea.ngStrap',
	'kumpaniumControllers',
	'kumpaniumFilters',
	'kumpaniumServices',
	'kumpaniumDirectives',
	'angularUtils.directives.dirPagination',
	'chart.js',
	'textAngular'
]);

angular.module('kumpaniumFilters', []);
angular.module('kumpaniumServices', ['ngResource']);
angular.module('kumpaniumDirectives', ['kumpaniumServices']);
angular.module('kumpaniumControllers', []);

angular.element(document).ready(function() {
	angular.bootstrap(document, ['kumpanium']);
});

