define(['angular', 'app/app'], function (angular, app) {
	return app
			.config(['$modalProvider', function ($modalProvider) {
					angular.extend($modalProvider.defaults, {
						html: true,
						animation: 'am-fade-and-scale',
						placement: 'top'
					});
				}])

			.config(['$popoverProvider', function ($popoverProvider) {
					angular.extend($popoverProvider.defaults, {
						placement: 'top',
						animation: 'am-fade-and-scale'
					});
				}])
			.config(function (paginationTemplateProvider) {
				paginationTemplateProvider.setPath('partials/dirpagination');
			});
});