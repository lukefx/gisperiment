dojo.require("esri.map");
dojo.addOnLoad(init);

function init() {
	angular.bootstrap(document, ['mapApp']);
}

var app = angular.module('mapApp', []);

app.directive('map', function() {
	return {
		restrict: 'E',
		controller: function($scope) {
			this.getMap = function() {
				return $scope.map;
			}
		},
		link: function($scope, element, attrs) {
			$scope.map = new esri.Map(element[0]);
		}
	}
});

app.directive('layer', function() {
	return {
		restrict: 'E',
		require: '^map',
		link: function(scope, element, attrs, MapCtrl) {
			MapCtrl.getMap().addLayer(new esri.layers.ArcGISDynamicMapServiceLayer(attrs.url));
		}
	}
});

app.controller('FirstMapCtrl', ['$scope', function($scope) {	
}]);