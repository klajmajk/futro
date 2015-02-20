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
