﻿dojo.require("esri.map");
dojo.addOnLoad(init);

function init() {
  angular.bootstrap(document, ['mapApp']);
}

var app = angular.module('mapApp', []);

app.directive('map', function() {
  return {
    restrict: 'E',
    scope: true,
    controller: function($scope) {
    
      this.map = {};
 
      this.getMap = function() {
        return this.map;
      }
      
    },
    link: function($scope, element, attrs, controller) {
      controller.map = new esri.Map(element[0]);
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