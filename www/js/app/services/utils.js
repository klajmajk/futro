define([], function () {
	'use strict';

	return function (serviceModule) {
		serviceModule.service('Utils', function () {
			this.getNestedPropertyByKey = function (data, key) {
				if (!(key instanceof Array))
					key = key.split('.');
				for (var j = 0; j < key.length; j++)
					data = data[key[j]];
				return data;
			};
		});
	};
});
