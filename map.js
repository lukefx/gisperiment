dojo.require("esri.map");
dojo.addOnLoad(function() {
  angular.bootstrap(document, ['mapApp']);
});

var app = angular.module('mapApp', []);

app.directive('map', function() {
  return {
    restrict: 'E',
    controller: function($scope) {
      this.map = {};
    },
    link: function(scope, element, attrs, controller) {
      
      var defaults = {
        center: typeof attrs.center !== 'undefined' ? JSON.parse(attrs.center) : null,
        zoom: attrs.zoom || null
      }
      
      controller.map = new esri.Map(element[0], defaults);
      scope.$on('syncMap', function(event, e) {
        controller.map.setExtent(e.extent);
      });
      
      controller.map.on('click', function(event) {
        scope.$emit('syncMap', { extent: controller.map.extent });
      });
      
    }
  }
});

app.directive('tiledLayer', function() {
  return {
    restrict: 'E',
    require: '^map',
    scope: false,
    link: function($scope, element, attrs, mapCtrl) {
      $scope.$watch(mapCtrl.map, function() {
        mapCtrl.map.addLayer(new esri.layers.ArcGISTiledMapServiceLayer(attrs.url));
      })
    }
  }
});

app.directive('dynamicLayer', function() {
  return {
    restrict: 'E',
    require: '^map',
    scope: false,
    link: function($scope, element, attrs, mapCtrl) {
      $scope.$watch(mapCtrl.map, function() {
        mapCtrl.map.addLayer(new esri.layers.ArcGISDynamicMapServiceLayer(attrs.url));
      })
    }
  }
});

app.controller('FirstMapCtrl', ['$scope', function($scope) {

}]);
