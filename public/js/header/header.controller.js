angular.module('appHeader', [])
    .controller('appHeaderController', function ($scope, $translate, $location, siteAndTownSaverService) {
        $scope.changeLanguage = function (language) {
            $translate.use(language);
        }

        $scope.goToHome = function () {
            siteAndTownSaverService.resetSearchAndRoute();
            $location.path('/home');
        }
    });