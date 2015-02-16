angular.module('kumpanium')
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


		.config(['$timepickerProvider', function ($timepickerProvider) {
				angular.extend($timepickerProvider.defaults, {
					timeFormat: 'HH:mm',
					timeType: 'number'
				});
			}])

		.config(['$datepickerProvider', function ($datepickerProvider) {
				angular.extend($datepickerProvider.defaults, {
					dateFormat: 'dd.MM.yyyy',
					startWeek: 1
				});
			}])

		.config(['paginationTemplateProvider', function (paginationTemplateProvider) {
			paginationTemplateProvider.setPath('html/dirpagination.html');
		}]);