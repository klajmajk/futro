kumpaniumControllers		
		.controller('statsController', ['$scope',
			function ($scope) {		
				$scope.tabs = [
					{
						title: 'Konzumace',
						content: '<canvas id="bar" class="chart chart-bar" data="data" labels="labels"></canvas>',
						controller: consumerStatController
					}
				];
				$scope.tabs.activeTab = 0;
			}]);
		
function consumerStatController($scope, $q, User) {
	$scope.labels = [];
	$scope.data = [[]];

	var consumers = User.getAllUsers();
	$q.when(consumers).then(function (data) {
		var i = data.length;
		while (i--) {
			$scope.labels.push(data[i].name);
			$scope.data[0].push(data[i].credit);
		}
	});
}