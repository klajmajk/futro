// http://jtblin.github.io/angular-chart.js/

define([
	'app/services'
], function () {
	'use strict';

	return function (controllerModule) {
		controllerModule.controller('StockController', ['$scope', 'API', '$alert',
			'Keg',
			function ($scope, API, $alert, Keg) {
				Keg.prototype.confirmDelete = function () {
					var message = 'Opravdu smazat sud č.' + this.id + ' – ' +
							this.beer.brewery.name + ' ' + this.beer.name +
							' ' + (this.volume / 1000) + ' L';

					if (confirm(message))
						this.$delete(function () {
							$scope.kegs = $scope.kegs.filter(function (value) {
								return value.volume > 0;
							});
						});
				};
				Keg.prototype.getAllowedStates = function () {
					switch (this.states.indexOf(this.state)) {
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
				var Brewery = API('brewery');

				
				Keg.query(function (data) {
					$scope.kegs = data;
				});
				
				Brewery.query(function(data) {
					$scope.breweries = data;
				});
				
				$scope.kegAdd = {
					init: function () {
						this.keg = new Keg();
						this.keg.quantity = 1;
					},
					save: function () {
						$scope.$broadcast('show-errors-check-validity');
						if (this.form.$invalid)
							return;

						var my = this;
						var quantity = this.keg.quantity;
						this.keg.dateAdd = this.keg.currentDateTime();
						this.keg.$save(
								function (keg) {
									var message = 'Skladové zásoby obohaceny o ' +
											quantity + 'x ' +
											keg.volume / 1000 + ' L ' +
											keg.beer.brewery.name +
											' ' + keg.beer.name;
									alertMessage('Dobrý!', message, 'success');

									while (quantity--) {
										var newKeg = angular.copy(keg);
										newKeg.id -= quantity;
										$scope.kegs.push(newKeg);
									}
									my.init();
								},
								function (error) {
									var message = 'Něco se pokazilo: <br /><br /><pre><strong>' +
											error.data.status + ' ' +
											error.data.code + ':</strong><br />' +
											error.data.message + '</pre>';
									alertMessage('Špatný!', message, 'danger');
								}
						);

						function alertMessage(title, content, type) {
							var message = {
								container: '#new_stock_alert_container',
								type: type || 'info',
								title: title,
								content: content
							};
							$alert(message);
						}
					},
					eventBrewerySelected: function () {
						Brewery.query({id: this.keg.brewery, relation: 'beer'},
						function (data) {
							this.beers = data;
						});
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
				
				$scope.finished = {
					itemsPerPage: 9,
					getPage: function(page) {
						var my = this,
							limit = this.itemsPerPage + ',' + (~~page - 1) * this.itemsPerPage;
						Keg.query({state: Keg.prototype.states[2], limit: limit}, function(data) {
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
			}]);
	};

});