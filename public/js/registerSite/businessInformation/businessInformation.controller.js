'use strict';

angular.module('registerSite')
    .controller('businessInformationController', function ($scope, $auth, $http, messageService,
                                                           API_CONFIG, categories,
                                                           $location, MunicipiosFactory, authenticationService, siteAndTownSaverService,
                                                           siteInformationService, $translate, navigationService) {

        
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

        $scope.changeViewLocation = function () {
            if ($scope.registerSiteForm.$valid) {
                saveDataAndChangeView('/location');
            } else {
                $scope.showRequiredFieldMessage = true;
            }


        };
        $scope.changeViewHome = function () {
            navigationService.cameToBusinessInformationThrough == 'registertrader' ? $location.path('/home') : $location.path('/accountinfo');
        };

        $scope.$on('$routeChangeStart', function (scope, next, current) {
            if(next.$$route.controller=='registerTradeController') {
                $location.path('/home');
            }
        });

         $scope.deleteBusinessLocation=function(){
             $scope.businessLocation=undefined;
        }

        function saveDataAndChangeView(view) {
            saveSiteInformation();
            $location.path(view);
        }
        $scope.updateSite = function() {
            console.log("emiting...");
            $scope.$emit('saveSite');
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

    });