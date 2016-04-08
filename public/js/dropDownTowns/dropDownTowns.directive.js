angular.module('dropDownTowns')
    .directive('dropDownTownDirective',[function(){
        return {
            restrict: 'E',
            templateUrl: 'js/dropDownTowns/drop-Down-Towns.html',
            controller: 'dropDownTownsController'
        }
    }]);
