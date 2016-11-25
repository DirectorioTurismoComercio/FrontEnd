'use strict';

angular.module('map', ['uiGmapgoogle-maps', 'ch.filters'])
    .config(function ($routeProvider, uiGmapGoogleMapApiProvider) {
        uiGmapGoogleMapApiProvider.configure({
            //key: 'AIzaSyB01Crhc-gyfYhAxa8IdSVcKuUC4lHai7E',
            v: '3.22',
            libraries: 'weather,geometry,visualization,places'
        });

        $routeProvider
            .when('/map', {
                templateUrl: 'js/map/map.html',
                controller: 'MapController',
                reloadOnSearch: false
            });
    })

.directive('onFinishRender',['$timeout', '$parse', function ($timeout, $parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit('ngRepeatFinished');
                    if(!!attr.onFinishRender){
                        $parse(attr.onFinishRender)(scope);
                    }
                });
            }
        }
    }
}])

