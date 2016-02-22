(function () {
    //'gemStore' module depends on 'store-products' modules
    angular.module('gemStore', ['ngRoute', 'ngResource', 'userModule', 'ngAnimate', 'ngMaterial', 'ngAria', 'angularUtils.directives.dirPagination', 'ngMessages', 'ngCookies', 'ngSanitize', 'com.2fdevs.videogular',
                                'constants', 'auth'])
        .config(function ($interpolateProvider) {
            $interpolateProvider.startSymbol('%%');
            $interpolateProvider.endSymbol('%%');
        })
        //Autenticación
        // .config(['$httpProvider', function($httpProvider){
        //   $httpProvider.defaults.xsrfCookieName = 'csrftoken';
        //   $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
        // }])
        .directive("pageNavigation", function () {
            return {
                restrict: 'E',
                templateUrl: 'templates/navbar.html',
                controller: function ($scope) {
                    $scope.MobileMenu = true;
                    $scope.toggleMobileMenu = function () {
                        $scope.MobileMenu = $scope.MobileMenu === false ? true : false;
                    };
                }
            };
        })
        .directive("pageFooter", function () {
            return {
                restrict: 'E',
                templateUrl: 'templates/footer.html'
            };
        }).directive('sideBar', ['navBar', 'autenticacionService', '$location','$route', function (navBar, autenticacionService, $location) {
            return {
                restrict: "E",
                templateUrl: 'templates/directives/side-bar.html',
                link: function (scope, element, attr) {

                    scope.isAuthenticated = function() {
                        return autenticacionService.isUserAuthenticated();
                    };

                    scope.logout=function(){
                        return autenticacionService.logout();
                    }

                    scope.toggleRight = function(){
                        navBar.open();
                    }

                    scope.close= function(){
                        navBar.close();
                    }

                    scope.isOnProfileMainMenuPage=function(){
                        return autenticacionService.isOnProfileMainMenu();

                    }

                    scope.redirectToProfileMain = function(){
                        $location.path('/profileMain');
                    }
                }
            };
        }])
})();