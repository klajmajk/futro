// http://jtblin.github.io/angular-chart.js/

define([
	'app/services'
], function () {
	'use strict';

	return function (ctrl) {
		ctrl.controller('UsersController', ['$scope', '$q',
			function ($scope, $q) {
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
									this.edit[item] && this.model[item])
								changes = this.user[item] = this.model[item];

						if (this.password.new1)
							changes = this.user.password = this.password;

						return changes ? this.user.$save().$promise : $q.when([]);
					}
				};
			}]);
	};

});