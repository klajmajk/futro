define([], function () {
	'use strict';

	return function (serviceModule) {
		serviceModule.service('Utils', [
			'$alert',
			function ($alert) {
				return {
					getNestedPropertyByKey: function (data, key) {
						if (!(key instanceof Array))
							key = key.split('.');
						for (var j = 0; j < key.length; j++)
							data = data[key[j]];
						return data;
					},
					alertMessage: function (title, content, context, querySelector) {
						var message = {
							title: title,
							content: content,
							type: context || 'info',
							container: querySelector
						};
						$alert(message);
					},
					validateForm: function ($scope, form) {
						$scope.$broadcast('show-errors-check-validity', form);
					},
					dateToISO: function (date) {
						if (!(date instanceof Date))
							date = new Date(date || null);
						
						if (!Date.prototype.toISOString) {
							(function () {
								function pad(number) {
									if (number < 10) {
										return '0' + number;
									}
									return number;
								}

								Date.prototype.toISOString = function () {
									return this.getUTCFullYear() +
											'-' + pad(this.getUTCMonth() + 1) +
											'-' + pad(this.getUTCDate()) +
											'T' + pad(this.getUTCHours()) +
											':' + pad(this.getUTCMinutes()) +
											':' + pad(this.getUTCSeconds()) +
											'.' + (this.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5) +
											'Z';
								};

							}());
						}
						
						return date.toISOString();
					}
				};
			}]);
	};
});
