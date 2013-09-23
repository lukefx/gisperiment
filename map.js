dojo.require("esri.map");
dojo.addOnLoad(function() {
  angular.bootstrap(document, ['mapApp']);
});

var app = angular.module('mapApp', []);

app.directive('map', function() {
  return {
    restrict: 'EA',
    controller: function($scope) {
    
      this.map = {};
 
      this.getMap = function() {
        return this.map;
      }
      
    },
    link: function(scope, element, attrs, controller) {
      controller.map = new esri.Map(element[0], { zoom:attrs.zoom, center:JSON.parse(attrs.center) });
      controller.map.on('click', function(event) {
        console.log(controller.map.extent);
      });
    }
  }
});

app.directive('layer', function() {
  return {
    restrict: 'E',
    require: '^map',
    scope: false,
    link: function($scope, element, attrs, mapCtrl) {
    
      $scope.$watch(mapCtrl.map, function() {
        mapCtrl.getMap().addLayer(new esri.layers.ArcGISTiledMapServiceLayer(attrs.url));
      })
      
    }
  }
});

app.controller('FirstMapCtrl', ['$scope', function($scope) {

}]);