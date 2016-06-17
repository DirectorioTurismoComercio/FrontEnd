angular.module('appHeader', [])
    .controller('appHeaderController', function ($scope, $translate, $location, siteAndTownSaverService) {

        $scope.selectedLanguage=$translate.use();

        $scope.changeLanguage = function (language) {
            $scope.selectedLanguage = language;
            $translate.use(language);
        }

        $scope.goToHome = function () {
            siteAndTownSaverService.resetSearchAndRoute();
            $location.path('/home');
        }
    });