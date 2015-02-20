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