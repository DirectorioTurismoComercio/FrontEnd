'use strict';

angular.module('registerSite')
    .controller('businessInformationController', function ($scope, $auth, $http, messageService,
                                                           API_CONFIG, categories,
                                                           $location, MunicipiosFactory, authenticationService, siteAndTownSaverService,
                                                           siteInformationService, $translate, navigationService, municipalityInformationService) {


        $scope.sitePhoneNumber = siteInformationService.sitePhoneNumber;
        $scope.whatsapp = siteInformationService.whatsapp;
        $scope.web = siteInformationService.web;
        $scope.openingHours = siteInformationService.openingHours;
        $scope.businessName = siteInformationService.businessName;
        $scope.businessLocation = siteInformationService.businessLocation;
        $scope.businessDescription = siteInformationService.businessDescription;
        $scope.tags = siteInformationService.tags;
        $scope.businessEmail = siteInformationService.businessEmail;
        $scope.businessAddress = siteInformationService.businessAddress;
        $scope.businessMunicipality = siteInformationService.businessMunicipality;
        $scope.isInMunicipalitySite=false;


        $scope.showRequiredFieldMessage = false;
        $scope.waitingRegister = false;
        $scope.user = authenticationService.getUser();
        checkBusinessType();

        siteInformationService.user= $scope.user;


        categories.getCategories().then(function (response) {
            $scope.categories = response;
        }).catch(function (error) {
            console.log("Hubo un error", error);
        });


        MunicipiosFactory.getTowns().then(function (response) {
            $scope.municipalitiesGroupedByLetter = response;
        }).catch(function (error) {
            console.log("Ocurrio un error", error);
        });

        $scope.changeViewLocation = function () {
            if ($scope.registerSiteForm.$valid) {
                saveDataAndChangeView('/category');
            } else {
                $scope.showRequiredFieldMessage = true;
            }

        };
        $scope.changeViewHome = function () {
            navigationService.accountInfoRoute($scope.user);
        };

        $scope.$on('$routeChangeStart', function (scope, next, current) {
            if (next.$$route.controller == 'registerTradeController') {
                $location.path('/home');
            }
        });

        $scope.deleteBusinessLocation = function () {
            $scope.businessLocation = undefined;
        }

        function saveDataAndChangeView(view) {
            saveSiteInformation();
            $location.path(view);
        }

        $scope.updateSite = function () {
            console.log("emiting...");
            $scope.$emit('saveSite');
        }

        function checkBusinessType() {
            if (!$scope.businessMunicipality || $scope.user.tipo_cuenta=="M" ) {
                $scope.businessMunicipality = municipalityInformationService.getMunicipalityName();
                if ($scope.businessMunicipality) {
                    $scope.isInMunicipalitySite = true;
                }
            }
        }


        function saveSiteInformation() {
            siteInformationService.sitePhoneNumber = $scope.sitePhoneNumber;
            siteInformationService.whatsapp = $scope.whatsapp;
            siteInformationService.web = $scope.web;
            siteInformationService.openingHours = $scope.openingHours;
            siteInformationService.businessName = $scope.businessName;
            siteInformationService.businessLocation = $scope.businessLocation;
            siteInformationService.businessDescription = $scope.businessDescription;
            siteInformationService.tags = $scope.tags;
            siteInformationService.businessEmail = $scope.businessEmail;
            siteInformationService.businessAddress = $scope.businessAddress;
            siteInformationService.businessMunicipality = $scope.businessMunicipality;
        }

    });