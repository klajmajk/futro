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
				this.original = null;
				this.index = null;
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