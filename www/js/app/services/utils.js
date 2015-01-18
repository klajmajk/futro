define([], function () {
	'use strict';

	return function (serviceModule) {
		serviceModule.service('Utils', ['$alert', function ($alert) {
			this.getNestedPropertyByKey = function (data, key) {
				if (!(key instanceof Array))
					key = key.split('.');
				for (var j = 0; j < key.length; j++)
					data = data[key[j]];
				return data;
			};
			this.alertMessage = function(title, content, context, querySelector) {
					var message = {
						title: title,						
						content: content,
						type: context || 'info',
						container: querySelector
					};
					$alert(message);
			};
			this.validateForm = function ($scope, form) {
				$scope.$broadcast('show-errors-check-validity', form);
			};
		}]);
	};
});
