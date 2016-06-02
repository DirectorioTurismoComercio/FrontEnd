angular.module('businessBrowser')
    .directive('browserInputField', [function () {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: 'js/businessBrowser/browser-Input-Field.html',
            controller: 'businessBrowserController'
        }
    }]);