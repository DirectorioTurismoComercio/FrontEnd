angular.module('appHeader')
    .directive('appHeader',[function(){
        return {
            restrict: 'E',
            templateUrl: 'js/header/app-header.html',
            controller: 'appHeaderController'
        }
    }]);