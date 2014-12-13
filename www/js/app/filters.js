'use strict';

/* Filters */

angular.module('kumpaniumFilters', [])

		.filter('label', function () {
			return function (input, context) {
				return '<span class="label label-' + (context || 'default') +
						'">' + input + '</span>';
			};
		})
		
		.filter('liters', function () {
			return function (mililitres) {
				return ~~(mililitres / 1000) + ' L';
			};
		})
		
		.filter('percent', function () {
			return function (fraction) {
				return ~~(fraction * 100) + '%';
			};
		})
		
		.filter('total', function () {
			return function (input) {
				var i = input instanceof Array ? input.length : 0;
				var a = arguments.length;
				if (a === 1 || i === 0)
					return i;

				var keys = [];
				while (a-- > 1) {
					var key = arguments[a].split('.');
					var property = getNestedPropertyByKey(input[0], key);
					if (isNaN(property))
						throw 'filter total can count only numeric values';
					keys.push(key);
				}

				var total = 0;
				while (i--) {
					var product = 1;
					for (var k = 0; k < keys.length; k++)
						product *= getNestedPropertyByKey(input[i], keys[k]);
					total += product;
				}
				return total;

				function getNestedPropertyByKey(data, key) {
					for (var j = 0; j < key.length; j++)
						data = data[key[j]];
					return data;
				}
			};
		})
		
		.filter('max', function($filter) {
			return function (array, property) {
				var ordered = $filter('orderBy')(array, property);
				return ordered[0].property;
			};
		})
		
		.filter('min', function($filter) {
			return function (array, property) {
				var ordered = $filter('orderBy')(array, property, true);
				return ordered[0].property;
			};
		})
		
		.filter('beerTranslate', function() {
			return function(input) {
				if (typeof input === 'string')
					return input.replace(/piv|mal/gi, function(match) {
						return '*' + (match === 'mal' ? 300 : 500) + '+';
					});
			};
		})
		
		.filter('calculate', function () {
			return function (input) {
				if (!isNaN(+input)) {
					return +input;
				} else if (typeof input === 'string') {
					var simpleMath = input.replace(/(,\d+)|(?:[^\s\d\+\-\*\/])/g,
							function (match, comaSeparated) {
								return comaSeparated ? comaSeparated.replace(',', '.') : '';
							});
					simpleMath = simpleMath.replace(/(?:[\s\+\-\*\/]*$)|(?:^[\s\+\-\*\/]*)/g, '');
					return eval(simpleMath);
				}
			};
		});
