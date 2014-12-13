'use strict';

var kumpaniumControllers = angular.module('kumpaniumControllers', []);

kumpaniumControllers

		.run(function ($rootScope, $window, User) {
			$rootScope.isManager = $window.isManager;
			$rootScope.usersById = {};
			$rootScope.users = User.query(function(users) {
				var i = users.length;
				while(i--)
					$rootScope.usersById[users[i].id] = users[i];
			});
			$rootScope.checkAll = function (objects, action) {
					var i = objects.length;
					while (i--)
						objects[i].checked = !!action;
				};
		})

		.controller('newsConstroller', ['$scope', 'API', '$q', '$rootScope', 'User',
			function ($scope, API, $q, $rootScope, User) {
				$q.all([API('news').query().$promise, $rootScope.users.$promise]).then(function (data) {
					var news = data[0];
					var i = news.length;
					while (i--) {
						var user = $rootScope.usersById[news[i].user];
						news[i].user = {
							name: user.name,
							context: user.getRole().context
						};
					}		
					
					$scope.news = news;
				});
			}])

		.controller('usersController', ['$scope',
			function ($scope) {
				
			}])

		.controller('stockController', ['$scope', 'API', '$alert',
			'Keg',
			function ($scope, API, $alert, Keg) {
				Keg.prototype.confirmDelete = function() {
					var message = 'Opravdu smazat sud č.' + this.id + ' – ' +
							this.beer.brewery.name + ' ' + this.beer.name +
							' '	+ (this.volume / 1000) + ' L';
					
					if(confirm(message))
						this.$delete(function() {
							$scope.kegs = $scope.kegs.filter(function(value) {
								return value.volume > 0;
							});
						});
				};
				Keg.prototype.getAllowedStates = function () {
					switch(this.states.indexOf(this.state)) {
						case 0:
							var allowed = [this.states[1], 'remove'];
							break;
						case 1:
							var allowed = [this.states[0], this.states[2]];
							break;
						default:
							return null;
					}
					
					var i = allowed.length;
					var dropdownData = [];
					while (i--) {
						dropdownData.push({
							text: this.getStateLabel(allowed[i]),
							click: allowed[i] === 'remove' ? 'keg.confirmDelete()' :
									'(keg.state="' + allowed[i] + '") && keg.$save()'									
						});
					}
					return dropdownData;
				};				
				$scope.kegs = Keg.query();
				var Brewery = API('brewery');

				// Add new keg form
				$scope.formTruncate = function () {
					$scope.newStock = new Keg();
					$scope.newStock.quantity = 1;
				};
				$scope.formTruncate();
				$scope.breweries = Brewery.query();
				$scope.assignBeers = function () {
					$scope.beers = Brewery.query({
						id: $scope.newStock.brewery,
						relation: 'beer'
					});
				};
				$scope.formBeerSelected = function () {
					if (typeof $scope.newStock.price === 'undefined' &&
							typeof $scope.newStock.volume !== 'undefined')
						Keg.query(function (list) {
							var pricePerVolume;
							var i = list.length;
							while (i--)
								if ($scope.newStock.beer === list[i].beer.id) {
									if ($scope.newStock.volume === list[i].volume)
										return $scope.newStock.price = list[i].price;
									else if (typeof pricePerVolume === 'undefined')
										pricePerVolume = list[i].price / list[i].volume;
								}
							
							if (typeof pricePerVolume !== 'undefined')
								$scope.newStock.price = ~~(pricePerVolume * $scope.newStock.volume);								
						});
				};
				$scope.formSave = function () {
					$scope.newStock.dateAdd = $scope.newStock.currentDateTime();
					var quantity = $scope.newStock.quantity;
					$scope.newStock.$save(
							function () {								
								var message = 'Skladové zásoby obohaceny o ' +
										quantity + 'x ' +
										$scope.newStock.volume / 1000 + ' L ' +
										$scope.newStock.beer.brewery.name +
										' ' + $scope.newStock.beer.name;
								alertMessage('Dobrý!', message, 'success');

								while (quantity--) {
									var newKeg = angular.copy($scope.newStock);
									newKeg.id -= quantity;
									$scope.kegs.push(newKeg);
								}
								$scope.formTruncate();
							},
							function (error) {
								var message = 'Něco se pokazilo: <br /><br /><pre><strong>' +
										error.data.status + ' ' +
										error.data.code + ':</strong><br />' +
										error.data.message + '</pre>';
								alertMessage('Špatný!', message, 'danger');
							});

					function alertMessage(title, content, type) {
						var message = {
							container: '#new_stock_alert_container',
							type: type || 'info',
							title: title,
							content: content
						};
						$alert(message);
					}
				};
			}])

		// http://jtblin.github.io/angular-chart.js/
		.controller('statsController', ['$scope',
			function ($scope) {
				$scope.tabs = [
					{
						title: 'Konzumace',
						content: '<canvas id="bar" class="chart chart-bar" data="data" labels="labels"></canvas>',
						controller: userStatController
					}
				];
				$scope.tabs.activeTab = 0;
			}]);

function userStatController($scope, User) {
	$scope.labels = [];
	$scope.data = [[]];

	User.query(function (users) {
		var i = users.length;
		while (i--) {
			$scope.labels.push(users[i].name);
			$scope.data[0].push(users[i].balance);
		}
	});

}

