define([
	'app/services'
], function () {
	'use strict';

	return function (ctrl) {
		ctrl.controller('UsersController', [
			'$scope', '$q', 'API',
			function ($scope, $q, API) {
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
					init: function(user) {
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
								function(credit) {
									$scope.creditAdd.user.credit.push(credit);
									$scope.creditAdd.user.balance += credit.amount;
									return true;
								},
								function(error) {
									return false;
								});
					}
				};
				
			}]);
	};

});