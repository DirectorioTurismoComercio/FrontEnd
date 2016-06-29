angular.module('appHeader', [])
    .controller('appHeaderController', function ($scope, $translate, $location, siteAndTownSaverService,isUserLoggedIn, authenticationService, $auth, $route, $cookies,$cookieStore, $http) {

        $scope.selectedLanguage=$translate.use();
        $scope.isUserLoggedIn=isUserLoggedIn();

        $scope.changeLanguage = function (language) {
            $scope.selectedLanguage = language;
            $translate.use(language);
        }

        $scope.goToHome = function () {
            siteAndTownSaverService.resetSearchAndRoute();
            $location.path('/home');
        }

        $scope.logOut=function(){
            $auth.logout();

            authenticationService.logout().then(function(){

                $location.path('home');
                $route.reload();
            });
        }
    });