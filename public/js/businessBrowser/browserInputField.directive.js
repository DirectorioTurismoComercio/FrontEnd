angular.module('businessBrowser')
    .directive('browserInputField',[function(){
        return {
            restrict: 'E',
            templateUrl: 'js/businessBrowser/browser-Input-Field.html',
            controller: 'businessBrowserController',
            scope:{
                isonmapview:'=',
                result:'=',
                doSearch:'&',
                showRoute:'&',
                isoncreateroute:'=',
                placeholdertext:'@'
            }
        }
    }]);