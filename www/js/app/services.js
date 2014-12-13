'use strict';

/* Services */
			
var kumpaniumServices = angular.module('kumpaniumServices', ['ngResource']);

kumpaniumServices

		.factory('API', ['$resource', '$cacheFactory',
			function ($resource, $cacheFactory) {
				var apiPath = '/futro/www/futro/';
				
				return function (presenter) {
					var paramDefaults = apiPath + presenter + '/:id/:relation/:relationId';
					var api = $resource(paramDefaults, {id: '@id'}, {
								update: {method: 'PUT'},
								get: {method: 'GET', cache: true, params: {outputAssoc: 1}},
								query: {method: 'GET', cache: true, isArray: true}
							});
							
					api.paramDefaults = paramDefaults;
					api.$clearCache = function(params) {
						var cache = $cacheFactory.get('$http');
						var cacheKey = this.paramDefaults.replace(/\/:\w+/g, function(match) {
							var key = match.substr(2);
							return params[key] ? '/' + params[key] : '';
						});
						cache.remove(cacheKey);
					};
					api.prototype.currentDateTime = function () {
						var now = new Date(),
								tzo = -now.getTimezoneOffset(),
								dif = tzo >= 0 ? '+' : '-',
								pad = function (num) {
									var norm = ~~num;
									return norm < 10 ? '0' + norm : norm;
								};
						return now.getFullYear()
								+ '-' + pad(now.getMonth() + 1)
								+ '-' + pad(now.getDate())
								+ 'T' + pad(now.getHours())
								+ ':' + pad(now.getMinutes())
								+ ':' + pad(now.getSeconds())
								+ dif + pad(tzo / 60)
								+ ':' + pad(tzo % 60);
					};
					
					return api;
				};
			}])

		.factory('User', ['API', '$window',
			function (API, $window) {
				var HONZA_DVORAK_ID = 4;
				var User = API('user');
				var roles = {
					super_admin: {
						name: 'Administrátor',
						context: 'primary'
					},
					beer_manager: {
						name: 'Pivní manager',
						context: 'success'
					},
					kumpan: {
						name: 'Kumpán',
						context: 'danger'
					},
					guest: {
						name: 'Podkumpán',
						context: 'default'
					},
					dvorak: {
						name: '<i class="glyphicon glyphicon-star"></i> Mecenáš ' +
								'<i class="glyphicon glyphicon-star"></i>',
						context: 'warning'
					}
				};
				
				angular.extend(User.prototype, {
					getCreditHistory: function () {
						return User.query({id: this.id, relation: 'credit'});
					},
					getRole: function (role, id) {
						return roles[(id || this.id) === HONZA_DVORAK_ID ?
							'dvorak' : (role || this.role)];
					}
				});
				
				return User;
			}])

		.factory('Keg', ['API', '$filter', '$q',
			function (API, $filter, $q) {
				var Keg = API('keg');
				
				angular.extend(Keg.prototype, {
					states: ['STOCKED', 'TAPPED', 'FINISHED'],
					stateLabels: [
						{text: 'Skladem', context: 'success'},
						{text: 'Na čepu', context: 'warning'},
						{text: 'Vypito', context: 'default'}
					],
					volumes: [5000, 10000, 15000, 20000, 30000, 50000],
					isValid: function () {
						return this.volumes.indexOf(this.volume) !== -1 &&								
								this.beer > 0 && (this.price >= 0.01 || this.price === 0);
					},
					getConsumption: function () {
						this.consumption = Keg.query({id: this.id, relation: 'consumption'});
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
					removeConsumptions: function() {
						var consumption = this.consumption,
								api = API('consumption'),
								i = consumption.length,
								defered = [],
								checked = {};
					
						while(i--)
							if (consumption[i].checked) {
								var id = consumption[i].id;
								checked[id] = i;
								defered.push(api.delete({id: id}).$promise);
							}
						
						$q.all(defered).then(function(ids) {
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
