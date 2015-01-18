// http://jtblin.github.io/angular-chart.js/

define([
	'app/services'
], function () {
	'use strict';

	return function (ctrl) {
		ctrl.controller('UsersController', [
			'$scope', '$q', 'API', '$popover',
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
						
						console.log(this.user);

						return changes !== false ? this.user.$save().$promise : $q.when([]);
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
						
						var my = this;
						this.credit.dateAdd = this.credit.currentDateTime();
						return this.credit.$save(
								function(credit) {
									my.user.credit.push(credit);
									my.user.balance += credit.amount;
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