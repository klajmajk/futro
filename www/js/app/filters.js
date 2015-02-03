define([
	'angular',
	'app/services'
], function (angular) {
	'use strict';

	return angular.module('kumpaniumFilters', [])

			.filter('label', function () {
				return function (input, context) {
					return '<span class="label label-' + (context || 'default') +
							'">' + input + '</span>';
				};
			})

			.filter('liters', function ($filter) {
				return function (milliliters, fractionSize) {
					var liters = milliliters / 1000;
					return (fractionSize ? $filter('number')(liters, fractionSize) :
							~~liters) + ' L';
				};
			})

			.filter('percent', function () {
				return function (fraction) {
					return ~~(fraction * 100) + '%';
				};
			})

			.filter('total', function (Utils) {
				return function (input) {
					var i = input instanceof Array ? input.length : 0;
					var a = arguments.length;
					if (a === 1 || i === 0)
						return i;

					var keys = [];
					while (a-- > 1) {
						var key = arguments[a].split('.');
						var property = Utils.getNestedPropertyByKey(input[0], key);
						if (isNaN(property))
							throw 'filter total can count only numeric values';
						keys.push(key);
					}

					var total = 0;
					while (i--) {
						var product = 1;
						for (var k = 0; k < keys.length; k++)
							product *= Utils.getNestedPropertyByKey(input[i], keys[k]);
						total += product;
					}
					return total;
				};
			})

			.filter('max', function ($filter) {
				return function (array, property) {
					var ordered = $filter('orderBy')(array, property, true);
					return ordered[0][property];
				};
			})

			.filter('min', function ($filter) {
				return function (array, property) {
					var ordered = $filter('orderBy')(array, property);
					return ordered[0][property];
				};
			})

			.filter('groupBy', function (Utils) {
				if (typeof memory === 'undefined')
					var memory = {};
				return function (array, property, special) {
					if (!(array instanceof Array) || array.length === 0 || !property)
						return array;

					var trace = angular.toJson(array[0]).substr(0, 25) +
							array.length + property;
					if (typeof memory[trace] === 'undefined') {
						var grouped = {},
								i = array.length,
								key;
						while (i--) {
							key = Utils.getNestedPropertyByKey(array[i], property);
							switch (special) {
								case 'date':
									key = key.substr(0, 10);
							}

							if (typeof grouped[key] === 'undefined')
								grouped[key] = [];
							grouped[key].push(array[i]);
						}
						memory[trace] = grouped;
					}

					return memory[trace];
				};
			})

			.filter('beerTranslate', function () {
				return function (input) {
					if (typeof input === 'string')
						return input.replace(/piv|mal/gi, function (match) {
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
			})

			.filter('capitalize', function () {
				return function (string) {
					return string.charAt(0).toUpperCase() + string.slice(1);
				};
			})

			.filter('nl2br', function () {
				return function (string) {
					return string.replace(/\n/g, '<br />');
				};
			})

			.filter('charcount', function () {
				return function (string) {
					if (typeof string !== 'undefined')
						string = string.replace(/(<[^>]+?>)/ig, '').replace(/(\&.+?\;)/g, ' ');
					return string && string.length || 0;
				};
			})

			.filter('wordcount', function () {
				return function (string) {
					if (typeof string !== 'undefined')
						string = string.replace(/(<[^>]*?>)/ig, ' ').match(/\S+/g);							
					return string && string.length || 0;
				};
			});
});
