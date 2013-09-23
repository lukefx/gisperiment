var app = angular.module('chartApp', ["ngResource"])

app.factory("Entry", function($resource) {
	return $resource("/entries/:id", { id: "@id" }, { update: { method: "PUT"} });
});

app.directive('prova', function() {
	return {
		restrict: "E",
		template: "<div>{{title}}</div>",
		scope: {
			title: '@'
		},
		link: function(scope, element, attrs) {
			console.log("prova initialized!");
		}
	}
});

app.controller('GreetingCtrl', ['$scope', 'Entry', function($scope, Entry) {

	$scope.greeting = 'Hola';
	// $scope.entries = Entry.query();
	$scope.entries = [ { name: 'prova1' }, { name: 'prova2' }, { name: 'prova3' } ];
	
	$scope.addEntry = function() {
		if ($scope.newEntry.name != null) {
			$scope.entries.push($scope.newEntry)
			$scope.newEntry = {}
		}
	}
	
}]);