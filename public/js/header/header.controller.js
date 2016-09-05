angular.module('appHeader', [])
    .controller('appHeaderController', function ($scope, $translate, $location, siteInformationService, siteAndTownSaverService, isUserLoggedIn, authenticationService, $auth, $route, municipalityInformationService) {

        $scope.selectedLanguage = $translate.use();
        $scope.isUserLoggedIn = isUserLoggedIn();

        $scope.user = authenticationService.getUser();

        $scope.changeLanguage = function (language) {
            $scope.selectedLanguage = language;
            $translate.use(language);
        }

        $scope.goToHome = function () {
            siteAndTownSaverService.resetSearchAndRoute();
            $location.path('/home');
        }

        $scope.logOut = function () {
            $auth.logout();
            $auth.removeToken();
            clearData();
            authenticationService.logout().then(function () {
                $location.path('home');
                $route.reload();
            });
        }

        $scope.goToAccountInfo = function () {
            $scope.user.tipo_cuenta == "M" ? $location.path("/municipalityaccountinfo") : $location.path("/accountinfo");
        }

        function clearData() {
            if ($scope.user.tipo_cuenta != "M") {
                siteInformationService.sitePhoneNumber = undefined;
                siteInformationService.whatsapp = undefined;
                siteInformationService.web = undefined;
                siteInformationService.openingHours = undefined;
                siteInformationService.businessName = undefined;
                siteInformationService.businessLocation = undefined;
                siteInformationService.businessDescription = undefined;
                siteInformationService.tags = undefined;
                siteInformationService.businessEmail = undefined;
                siteInformationService.businessAddress = undefined;
                siteInformationService.businessCategories = undefined;
                siteInformationService.businessMunicipality = undefined;
                siteInformationService.mainPhoto = [];
                siteInformationService.facadePhotos = [];
                siteInformationService.insidePhotos = [];
                siteInformationService.productsPhotos = [];
            } else {
                municipalityInformationService.resetData();
            }
        }
    });