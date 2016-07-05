'use strict';

angular.module('registerSite')
    .controller('businessInformationController', function ($scope, $auth, $http,   messageService,
                                                    API_CONFIG, categories,
                                                    $location, MunicipiosFactory, authenticationService, siteAndTownSaverService,
                                                     siteInformationService, $translate) {


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
        $scope.businessCategories = siteInformationService.businessCategories;
        $scope.businessMunicipality = siteInformationService.businessMunicipality;

        $scope.showRequiredFieldMessage = false;
        $scope.waitingRegister = false;

        console.log("municipio", $scope.businessMunicipality);

        categories.getCategories().then(function (response) {
            $scope.categories = response;
        }).catch(function (error) {
            console.log("Hubo un error", error);
        });


        MunicipiosFactory.getTowns().then(function (response) {
            $scope.municipalities = response;
        }).catch(function (error) {
            console.log("Ocurrio un error", error);
        });



        $scope.register = function () {
            if ($scope.registerSiteForm.$valid) {
                $scope.waitingRegister = true;
                buildSiteFormData();
                sendSiteDataToServer();
            } else {
                $scope.showRequiredFieldMessage = true;
            }
        };
        $scope.changeViewLocation = function () {
        	 if ($scope.registerSiteForm.$valid) {
                        saveDataAndChangeView('/location');
                    } else {
                        $scope.showRequiredFieldMessage = true;
                    }


        };
        $scope.changeViewHome = function () {
             $location.path('/home')
        };

        function saveDataAndChangeView(view){
            saveSiteInformation();
            $location.path(view);
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
            siteInformationService.businessCategories = $scope.businessCategories;
            siteInformationService.businessMunicipality = $scope.businessMunicipality;
        }

        function clearData() {
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
        }

    });