'use strict';

angular.module('registerSite')
    .controller('summaryController', function ($scope, $auth, $http, MapService, uiGmapIsReady, messageService,
                                                    API_CONFIG, categories,
                                                    $location, MunicipiosFactory, authenticationService, siteAndTownSaverService, siteInformationService, $translate, geolocation, ngDialog, $cookies) {


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
        $scope.siteId = siteInformationService.siteId;


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

        $scope.register = function () {
            if ($scope.registerSiteForm.$valid) {
                $scope.waitingRegister = true;
                siteInformationService.sitePhoneNumber = $scope.sitePhoneNumber;
                siteInformationService.whatsapp = $scope.whatsapp ;
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
                siteInformationService.siteId = $scope.siteId;

                $http.defaults.headers.post['X-CSRFToken'] = $cookies['csrftoken'];
                siteInformationService.sendSiteDataToServer(succesfullySaved,saveFailed);
            } else {
                $scope.showRequiredFieldMessage = true;
            }
        };


        $scope.changeViewPhotos=function(){
            $location.path('/photos');

        }

        $scope.doneRegistration = function () {
            ngDialog.close();
            $location.path('accountinfo');
        }


        var succesfullySaved = function (d) {
                    siteAndTownSaverService.setCurrentSearchedTown(undefined);
                    $scope.waitingRegister = false;
                    clearData();
                    ngDialog.open({
                        template: 'js/registerSite/completeRegistration.html',
                        width: 'auto',
                        showClose: false,
                        scope: $scope,
                        closeByEscape: false,
                        closeByDocument: false
                    });
        }
        var saveFailed = function(error){
            console.log("hubo un error", error);
        }

       
        function clearData() {
         siteInformationService.clearData(siteInformationService);
         
        }

    });