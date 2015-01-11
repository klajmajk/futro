define([], function () {
	'use strict';
	
	return function (serviceModule) {
		serviceModule.factory('Keg', ['API', '$filter', '$q',
			function (API, $filter, $q) {
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
	};
});
