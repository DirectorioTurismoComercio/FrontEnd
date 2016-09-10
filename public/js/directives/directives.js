(function() {
    angular.module("gemStore")
    .directive('myHeader', function() {
        return {
            restrict: 'E',
            //templateUrl: 'templates/ecosistema-header.html'
        };
    })
    .directive('myBreadcrumbs', function() {
        return {
            restrict: 'E',
            templateUrl: 'templates/breadCrumbs.html'
        };
    })
    .directive('myPasos', function() {
        return {
            restrict: 'E',
            templateUrl: 'templates/pasos.html'
        };
    })
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
    .directive('sideBar', ['navBar', '$location', 'authenticationService', 'isUserLoggedIn','$auth', function (navBar, $location, authenticationService, isUserLoggedIn, $auth) {
        return {
            restrict: "E",
            templateUrl: 'templates/directives/side-bar.html',
            link: function (scope, element, attr) {

                scope.isAuthenticated = function() {
                    return isUserLoggedIn();
                };

                scope.logout=function(){
                    authenticationService.logout()
                        .finally(function(){
                            $location.path('/signin');
                        });
                    $auth.removeToken();
                }

                scope.toggleRight = function(){
                    navBar.open();
                }

                scope.close= function(){
                    navBar.close();
                }

                scope.isOnProfileMainMenuPage=function(){
                    return $location.path().match(/profileMain/) != null;
                }

                scope.redirectToProfileMain = function(){
                    $location.path('/profileMain');
                }
            }
        };
    }]);

})();