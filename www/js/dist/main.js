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
angular.module('kumpaniumDirectives')

		.directive('cacheTemplate', [
			'$templateCache',
			function ($templateCache) {
				return {
					restrict: 'A',
					priority: 100,
					terminal: true,
					link: function (scope, element, attrs) {
						var cacheKey = attrs.cacheTemplate;
						var content = $templateCache.get(cacheKey);
						if (!content || content !== element[0].innerHTML)
							$templateCache.put(cacheKey, element[0].innerHTML);

						element.remove();
					}
				};
			}])

		.directive('compile', [
			'$compile',
			function ($compile) {
				return {
					restrict: 'A',
					link: function (scope, element, attrs) {
						var ensureCompileRunsOnce = scope.$watch(
								function (scope) {
									return scope.$eval(attrs.compile);
								},
								function (value) {
									element.html(value);
									$compile(element.contents())(scope);
									ensureCompileRunsOnce();
								}
						);
					}
				};
			}])

		.directive('showErrors', function () {
			return {
				restrict: 'A',
				require: 'form',
				link: function (scope, el, attrs, ctrl) {
					var formGroups = el[0].getElementsByClassName('form-group'),
							i = formGroups.length,
							fields = {};

					if (i === 0)
						return;

					while (i--) {
						var input = formGroups[i].querySelector('[name]');
						if (!input)
							continue;
						var inputElem = angular.element(input);
						fields[inputElem.attr('name')] = angular.element(formGroups[i]);
						inputElem.bind('change', function () {
							checkValidity(this.getAttribute('name'));
						});
					}

					scope.$on('show-errors-check-validity', function (event, form) {
						for (var field in form)
							if (form.hasOwnProperty(field) && fields.hasOwnProperty(field))
								checkValidity(field);
					});

					function checkValidity(name) {
						fields[name].toggleClass('has-error', ctrl[name].$invalid);
					}
				}
			};
		})

		.directive('validPhone', function () {
			return {
				require: 'ngModel',
				link: function (scope, el, attrs, ctrl) {
					ctrl.$validators.phone = function (modelValue, viewValue) {
						if (ctrl.$isEmpty(modelValue))
							return true;
						if (isNaN(modelValue))
							return false;
						var numberLength = modelValue.replace(/(^00)|\D/g, '').length;
						if (numberLength > 12 || numberLength < 9)
							return false;
						return true;
					};
				}
			};
		})

		// TODO: not used, just copied from https://docs.angularjs.org/guide/forms
		.directive('usernameExists', function () {
			return {
				require: 'ngModel',
				link: function (scope, el, attrs, ctrl) {
					var usernames = ['Jim', 'John', 'Jill', 'Jackie'];

					ctrl.$asyncValidators.username = function (modelValue, viewValue) {

						if (ctrl.$isEmpty(modelValue)) {
							// consider empty model valid
							return $q.when();
						}

						var def = $q.defer();

						$timeout(function () {
							// Mock a delayed response
							if (usernames.indexOf(modelValue) === -1) {
								// The username is available
								def.resolve();
							} else {
								def.reject();
							}

						}, 2000);

						return def.promise;
					};
				}
			};
		});



    
angular.module('kumpaniumFilters')

		.filter('label', function () {
			return function (input, context) {
				return '<span class="label label-' + (context || 'default') +
						'">' + input + '</span>';
			};
		})

		.filter('liters', ['$filter', function ($filter) {
			return function (milliliters, fractionSize) {
				var liters = milliliters / 1000;
				return (fractionSize ? $filter('number')(liters, fractionSize) :
						~~liters) + ' L';
			};
		}])

		.filter('percent', function () {
			return function (fraction) {
				return ~~(fraction * 100) + '%';
			};
		})

		.filter('total', ['Utils', function (Utils) {
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
						throw 'filter "total" is able count only numeric values';
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
		}])

		.filter('max', ['$filter', function ($filter) {
			return function (array, property) {
				var ordered = $filter('orderBy')(array, property, true);
				return ordered[0][property];
			};
		}])

		.filter('min', ['$filter', function ($filter) {
			return function (array, property) {
				var ordered = $filter('orderBy')(array, property);
				return ordered[0][property];
			};
		}])

		.filter('groupBy', ['Utils', function (Utils) {
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
		}])

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

angular.module('kumpanium')
		.config([
			'$routeProvider',
			function ($routeProvider) {
				'use strict';
				
				var path = '/partials';

				$routeProvider.
						when('/novinky', {
							title: 'Novinky',
							templateUrl: path + '/news',
							controller: 'NewsController'
						}).
						when('/konzumenti', {
							title: 'Konzumenti',
							templateUrl: path + '/users',
							controller: 'UsersController'
						}).
						when('/statistiky', {
							title: 'Statistiky',
							templateUrl: path + '/stats',
							controller: 'StatsController'
						}).
						when('/zasoby', {
							title: 'Zásoby',
							templateUrl: path + '/stock',
							controller: 'StockController'
						}).
						otherwise({
							redirectTo: '/novinky'
						});
			}])

		.run(['$rootScope', function ($rootScope) {
				$rootScope.$on("$routeChangeSuccess", function (event, currentRoute, previousRoute) {
					document.title = currentRoute.title + ' | ' + 'Kumpanium';
				});
			}]);

angular.module('kumpaniumControllers').controller('NewsController', [
	'$scope', 'API', '$q', '$rootScope',
	function ($scope, API, $q, $rootScope) {
		'use strict';
		
		var News = API('news');

		$scope.activeTab = 1;

		$q.all([News.query().$promise, $rootScope.users.$promise]).then(function (data) {
			var news = data[0];
			var i = news.length;
			while (i--)
				addAuthor(news[i]);

			$scope.news = news;
		});

		$scope.newsAdd = {
			init: function () {
				this.news = new News();
				this.original = this.index = {};
			},
			save: function () {
				var news = this.news,
						original = this.original;

				this.form.$setSubmitted();
				if (this.form.$invalid)
					return;

				if (!(news.setTerm && news.dateEnd)) {
					news.dateEnd = null;
				} else if (news.timeEnd) {
					var minutes = news.timeEnd / 1000 / 60;
					news.dateEnd.setUTCHours(~~(minutes / 60));
					news.dateEnd.setUTCMinutes(minutes % 60);
				}
				delete(news.setTerm);

				news.$save(
						function () {
							addAuthor(news);
							if (original) {
								angular.copy(news, original);
								$scope.activeTab = this.index;
							} else {
								$scope.news.push(news);
								$scope.activeTab = 1;
							}

							$scope.newsAdd.init();
							$scope.newsAdd.form.$setPristine();
						},
						function (error) {

						});
			},
			load: function (news, index) {
				this.index = index + 1;
				this.original = news;
				this.news = angular.copy(news);
				if (news.dateEnd) {
					this.news.setTerm = true;
					var date = new Date(news.dateEnd);
					this.news.dateEnd = date;
					this.news.timeEnd = $scope.isFullDay(date) ? null : date.getTime() % (24 * 60 * 60 * 1000);
				}
				$scope.activeTab = 0;
			}
		};
		$scope.newsAdd.init();

		$scope.isFullDay = function (date) {
			return /00:00:00/.test(date);
		};

		function addAuthor(news) {
			var user = $rootScope.usersById[news.user];
			news.user = {
				id: user.id,
				name: user.name,
				context: user.getRole().context
			};
		}
	}]);
angular.module('kumpaniumControllers').run([
	'$rootScope', '$window', 'User',
	function ($rootScope, $window, User) {
		'use strict';

		$rootScope.isManager = $window.isManager;
		$rootScope.currentUser = $window.currentUser;
		$rootScope.usersById = {};
		$rootScope.users = User.query(function (users) {
			var i = users.length;
			while (i--)
				$rootScope.usersById[users[i].id] = users[i];
		});
	}]);
angular.module('kumpaniumControllers').controller('StatsController', [
	'$scope', '$http', 'Utils',
	function ($scope, $http, Utils) {
		'use strict';
		
		// http://jtblin.github.io/angular-chart.js/
		var chartTypes = ['Bar', 'Doughnut', 'Line', 'Pie', 'PolarArea', 'Radar'];

		$scope.chart = {
			labels: [],
			data: [],
			series: [],
			type: chartTypes[0],
			clear: function () {
				this.labels = [];
				this.series = [];
				this.data = [];
			}
		};

		$scope.chartControl = {
			chart: {},
			form: {},
			type: [
				{value: 'Bar', label: 'stav'},
				{value: 'Line', label: 'vývoj'},
				{value: 'Pie', label: 'podíl'}
			],
			series: [
				{value: 'user', label: 'lidí'},
				{value: 'beer', label: 'piva'}
			],
			data: [
				{value: 'consumption', label: 'výtoč [L]'},
				{value: 'credit', label: 'útratu [Kč]'}
			],
			response: {},
			load: function () {
				var my = this,
						chart = this.chart;

				var query = '/futro/stat?data=' + chart.data + '&series=' + chart.series;
				if (chart.dateBegin)
					query += '&dateBegin=' + Utils.dateToISO(chart.dateBegin);
				if (chart.dateEnd)
					query += '&dateEnd=' + Utils.dateToISO(chart.dateEnd);


				$http.get(query)
						.success(function (data) {
							my.response = data;
							my.plot();
						})
						.error(function (data) {

						});
			},
			plot: function () {
				var chart = $scope.chart,
						length = this.response.length;
				if (length === 0)
					return;

				chart.clear();
				var data = chart.data,
						item, temp = {};
				switch (chart.type = this.chart.type) {
					case 'Bar':
						chart.data.push([]);
						data = chart.data[0];
					case 'Pie':
						for (var i = 0; i < length; i++) {
							item = this.response[i];
							if (typeof temp[item.series] === 'undefined')
								temp[item.series] = 0;
							temp[item.series] += item.data;
						}

						for (var label in temp) {
							chart.labels.push(label);
							data.push(temp[label]);
						}

						for (var i = 0, l = data.length; i < l; i++)
							data[i] = +data[i].toFixed(2);
						break;
					case 'Line':
						var series = {}, previous;
						for (var i = 0; i < length; i++) {
							item = this.response[i];
							if (typeof temp[item.date] === 'undefined')
								temp[item.date] = {};
							temp[item.date][item.series] = item.data;
							series[item.series] = true;
						}

						for (var serie in series)
							chart.series.push(serie);

						for (var date in temp) {
							chart.labels.push(date);
							for (var i = 0, l = chart.series.length; i < l; i++) {
								serie = chart.series[i];
								if (typeof data[i] === 'undefined')
									data.push([]);
								previous = data[i][data[i].length - 1] || 0;
								data[i].push(+(previous + (temp[date][serie] || 0)).toFixed(2));
							}
						}
						break;
				}

			},
			init: function () {
				var date = new Date();
				date.setMonth(0);
				date.setDate(1);
				date.setHours(0);
				date.setMinutes(0);

				this.chart = {
					type: 'Bar',
					series: 'user',
					data: 'consumption',
					dateBegin: date
				};
				this.load();
			}
		};
		$scope.chartControl.init();


	}]);
angular.module('kumpaniumControllers').controller('StockController', [
	'$scope', 'API', 'Utils', 'Keg', '$modal',
	function ($scope, API, Utils, Keg, $modal) {
		'use strict';
		
		var Brewery = API('brewery');
		var Beer = API('beer');

		Keg.query(function (data) {
			$scope.kegs = data;
		});

		Brewery.query(function (data) {
			$scope.breweries = data;
		});

		$scope.finished = {
			itemsPerPage: 9,
			getPage: function (page) {
				var my = this,
					limit = this.itemsPerPage + ',' + (~~page - 1) * this.itemsPerPage;
				Keg.query({state: Keg.prototype.states[2], limit: limit}, function (data) {
					my.kegs = data;
					my.count = data.length > 0 ? data[0].metadata.count : 0;
				});
			},
			loss: {
				good: 0.06,
				warn: 0.10,
				critic: 0.13
			}
		};
		$scope.finished.getPage(1);

		$scope.kegAdd = {
			init: function () {
				this.keg = new Keg();
				this.keg.quantity = 1;
				this.beers = null;
			},
			save: function () {
				this.form.$setSubmitted();
				if (this.form.$invalid)
					return;

				var quantity = this.keg.quantity;
				this.keg.dateAdd = this.keg.currentDateTime();
				this.keg.$save(
						function (keg) {
							var message = 'Skladové zásoby obohaceny o ' +
									quantity + 'x ' + keg.volume / 1000 + ' L ' +
									keg.beer.brewery.name + ' ' + keg.beer.name;
							Utils.alertMessage('Dobrý!', message, 'success', '#new_stock_alert_container');

							while (quantity--) {
								var newKeg = angular.copy(keg);
								newKeg.id -= quantity;
								$scope.kegs.push(newKeg);
							}
							$scope.kegAdd.init();
						},
						function (error) {
							var message = 'Něco se pokazilo: <br /><br /><pre><strong>' +
									error.data.status + ' ' + error.data.code +
									':</strong><br />' + error.data.message + '</pre>';
							Utils.alertMessage('Špatný!', message, 'danger', '#new_stock_alert_container');
						}
				);
			},
			eventBrewerySelected: function () {
				this.beers = Brewery.query({id: this.keg.brewery, relation: 'beer'});
			},
			eventBeerSelected: function () {
				var my = this;
				if (typeof this.keg.price === 'undefined' &&
						this.keg.volumes.indexOf(this.keg.volume) !== -1)
					$scope.kegs.$promise.then(function (kegs) {
						var pricePerVolume;
						var i = kegs.length;
						while (i--)
							if (my.keg.beer === kegs[i].beer.id) {
								if (my.keg.volume === kegs[i].volume)
									return my.keg.price = kegs[i].price;
								else if (typeof pricePerVolume === 'undefined')
									pricePerVolume = kegs[i].price / kegs[i].volume;
							}

						if (typeof pricePerVolume !== 'undefined')
							my.keg.price = ~~(pricePerVolume * my.keg.volume);
					});
			}
		};
		$scope.kegAdd.init();


		$scope.beerAdd = $modal({
			scope: $scope,
			template: 'modals/beeradd',
			show: false
		});
		angular.extend($scope.beerAdd, {
			init: function () {
				this.beer = new Beer();
				this.beer.brewery = $scope.kegAdd.keg.brewery;
			},
			save: function () {
				this.form.$setSubmitted();
				if (this.form.$invalid)
					return;

				this.beer.$save(
						function (beer) {
							$scope.kegAdd.beers.push(beer);
							$scope.kegAdd.keg.beer = beer.id;
							$scope.beerAdd.hide();
						},
						function (error) {

						});
			}
		});

		$scope.breweryAdd = $modal({
			scope: $scope,
			template: 'modals/breweryadd',
			show: false
		});
		angular.extend($scope.breweryAdd, {
			init: function () {
				this.brewery = new Brewery();
			},
			save: function () {
				this.form.$setSubmitted();
				if (this.form.$invalid)
					return;

				this.brewery.$save(
						function (brewery) {
							$scope.breweries.push(brewery);
							$scope.kegAdd.keg.brewery = brewery.id;
							$scope.kegAdd.eventBrewerySelected();
							$scope.breweryAdd.hide();
							$scope.beerAdd.show();
						},
						function (error) {

						});
			}
		});

	}]);
angular.module('kumpaniumControllers').controller('UsersController', [
	'$scope', 'API',
	function ($scope, API) {
		'use strict';
		
		$scope.userEdit = {
			user: {},
			model: {},
			edit: {},
			password: {},
			init: function (user) {
				this.user = user;
				this.model = {
					name: user.name,
					email: user.email,
					phone: user.phone
				};
				this.edit = this.password = {};
			},
			save: function () {
				var changes = false;
				for (var item in this.model)
					if (this.model.hasOwnProperty(item) &&
							this.edit[item] && this.model[item] &&
							this.user[item] !== this.model[item])
						changes = this.user[item] = this.model[item];

				if (this.password.new1)
					changes = this.user.password = this.password;

				if (changes !== false) {
					this.user.$save();
					return true;
				} else {
					return false;
				}
			}
		};

		$scope.creditAdd = {
			init: function (user) {
				var Credit = new API('user', user.id, 'credit');
				this.user = user;
				this.credit = new Credit;
			},
			save: function () {
				this.form.$setSubmitted();
				if (this.form.$invalid)
					return;

				this.credit.dateAdd = this.credit.currentDateTime();
				return this.credit.$save(
						function (credit) {
							$scope.creditAdd.user.credit.push(credit);
							$scope.creditAdd.user.balance += credit.amount;
							return true;
						},
						function (error) {
							return false;
						});
			}
		};

	}]);
angular.module('kumpaniumServices').factory('API', [
	'$resource', 'Utils',
	function ($resource, Utils) {
		'use strict';

		var apiPath = '/futro/';

		return function (presenter, id, relation) {
			var paramDefaults = apiPath +
					(presenter || ':presenter') + '/' +
					(id || ':id') + '/' +
					(relation || ':relation') +
					'/:relationId';

			var api = $resource(paramDefaults, {id: '@id'}, {
				update: {method: 'PUT'},
				get: {method: 'GET', cache: true, params: {outputAssoc: 1}},
				query: {method: 'GET', cache: true, isArray: true}
			});

			api.prototype.currentDateTime = function () {
				return Utils.dateToISO();
			};

			api.prototype.confirmDelete = function (message, successCallback, errorCallback) {
				message = message || 'Opravdu smazat položku ID: ' + this.id;
				if (confirm(message))
					this.$delete(successCallback, errorCallback);
			};


			return api;
		};
	}]);

angular.module('kumpaniumServices').factory('Keg', [
	'API', '$filter', '$q',
	function (API, $filter, $q) {
		'use strict';
		
		var Keg = API('keg');

		angular.extend(Keg.prototype, {
			states: ['STOCKED', 'TAPPED', 'FINISHED'],
			stateLabels: [
				{text: 'Skladem', context: 'success'},
				{text: 'Na čepu', context: 'warning'},
				{text: 'Vypito', context: 'default'}
			],
			volumes: [5000, 10000, 15000, 20000, 25000, 30000, 50000],
			getConsumption: function () {
				var my = this;
				this.consumption = Keg.query({id: this.id, relation: 'consumption'},
				function () {
					my.rest = my.volume - $filter('total')(my.consumption, 'volume');
				});
			},
			saveConsumption: function (additional) {
				var consumption = this.consumption,
						data = {
							volume: $filter('calculate')(
									$filter('beerTranslate')(additional.volume)),
							user: additional.user,
							keg: this.id,
							dateAdd: Keg.currentDateTime()
						};

				return API('consumption').save(data, function (success) {
					consumption.push(success);
				});
			},
			removeConsumptions: function () {
				var consumption = this.consumption,
						api = API('consumption'),
						i = consumption.length,
						defered = [],
						checked = {};

				while (i--)
					if (consumption[i].checked) {
						var id = consumption[i].id;
						checked[id] = i;
						defered.push(api.delete({id: id}).$promise);
					}

				$q.all(defered).then(function (ids) {
					for (var i = 0; i < ids.length; i++)
						consumption.splice(checked[ids[i].id], 1);
				});
			},
			getStateLabel: function (state) {
				state = state || this.state;
				if (state === 'remove')
					return createLabel({text: 'Smazat', context: 'danger'});

				var index = this.states.indexOf(state);
				if (index !== -1)
					return createLabel(this.stateLabels[index]);

				function createLabel(label) {
					return '<span class="label label-' +
							(label.context || 'default') +
							'">' + label.text + '</span>';
				}
			}
		});

		return Keg;
	}]);

angular.module('kumpaniumServices').factory('User', [
	'API',
	function (API) {
		'use strict';
		
		var HONZA_DVORAK_ID = 4,
			User = API('user'),
			roles = {
				super_admin: {name: 'Administrátor', context: 'primary'},
				beer_manager: {name: 'Pivní manager', context: 'success'},
				kumpan: {name: 'Kumpán', context: 'danger'},
				guest: {name: 'Spřízněná duše', context: 'default'}
			};

		angular.extend(User.prototype, {
			getRole: function () {
				var dvorak = {
					name: '<i class="glyphicon glyphicon-star"></i> Mecenáš ' +
							'<i class="glyphicon glyphicon-star"></i>',
					context: 'warning'
				};

				return this.id === HONZA_DVORAK_ID ? dvorak : roles[this.role];
			},
			getRoleLabel: function () {
				var role = this.getRole();
				return '<span class="label label-' + role.context + '">' +
						role.name + '</span>';
			},
			consumptionPerPage: 15,
			getConsumption: function (page) {
				page = page || 1;
				var limit = this.consumptionPerPage + ',' + (~~page - 1) * this.consumptionPerPage;
				this.consumption = User.query({
					id: this.id,
					relation: 'consumption',
					limit: limit
				});
			},
			creditPerPage: 20,
			getCredit: function (page) {
				page = page || 1;
				var limit = this.creditPerPage + ',' + (~~page - 1) * this.creditPerPage;
				this.credit = User.query({
					id: this.id,
					relation: 'credit',
					limit: limit
				});
			}
		});

		return User;
	}]);

angular.module('kumpaniumServices').service('Utils', [
	'$alert',
	function ($alert) {
		'use strict';
		
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
