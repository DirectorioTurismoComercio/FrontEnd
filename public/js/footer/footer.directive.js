angular.module('appFooter',[])
    .directive('appFooter',[function(){
        return {
            restrict: 'E',
            templateUrl: 'js/footer/app-footer.html',
            controller: 'footerController'
        }
    }]);
