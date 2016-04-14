angular.module('ecosistemaHeader')
    .directive('ecosistemaHeaderDirective',[function(){
        return {
            restrict: 'E',
            templateUrl: 'js/header/ecosistema-header.html',
            controller: 'ecosistemaHeaderController'
        }
    }]);