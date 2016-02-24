(function() {
    angular.module("gemStore")
    .directive('myHeader', function() {
        return {
            restrict: 'E',
            templateUrl: 'templates/header.html'
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
    .directive("pageFooter", function () {
        return {
            restrict: 'E',
            templateUrl: 'templates/footer.html'
        };
    })
    .directive('sideBar', ['navBar', 'autenticacionService', '$location', 'authenticationService', 'isUserLoggedIn', function (navBar, autenticacionService, $location, authenticationService, isUserLoggedIn) {
        return {
            restrict: "E",
            templateUrl: 'templates/directives/side-bar.html',
            link: function (scope, element, attr) {

                scope.isAuthenticated = function() {
                    return isUserLoggedIn();
                };

                scope.logout=function(){
                    authenticationService.logout();
                    autenticacionService.logout();
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
    }]);
})();