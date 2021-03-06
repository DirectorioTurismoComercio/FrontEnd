angular.module('appHeader', [])
    .controller('appHeaderController', function ($scope, $translate, $location, navigationService, siteInformationService, siteAndTownSaverService, isUserLoggedIn, authenticationService, $auth, $route, municipalityInformationService, $rootScope) {

        $scope.selectedLanguage = $translate.use();
        $scope.isUserLoggedIn = isUserLoggedIn();

        $scope.user = authenticationService.getUser();

        $scope.changeLanguage = function (language) {
            $scope.selectedLanguage = language;
            $translate.use(language);
        }

        $scope.goToHome = function () {
            siteAndTownSaverService.resetSearchAndRoute();
            navigationService.setClickedLogoButton(true);
            siteAndTownSaverService.searchedRoute.origin=undefined;
            siteAndTownSaverService.searchedRoute.destination=undefined;
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
            navigationService.accountInfoRoute($scope.user);
        }

        $rootScope.$on('ratingDone',function(evt, index){
            $scope.user = authenticationService.getUser();
            $scope.isUserLoggedIn = isUserLoggedIn();
        });

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