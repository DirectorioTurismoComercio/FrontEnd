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
                buildSiteFormData();
                sendSiteDataToServer();
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


        function buildSiteFormData() {
            var fd = siteInformationService.formData;

            fd.append('latitud', $scope.businessLocation.lat);
            fd.append('longitud', $scope.businessLocation.lng);
            fd.append('nombre', $scope.businessName);
            fd.append('descripcion', $scope.businessDescription);
            fd.append('municipio_id', $scope.businessMunicipality.id);
            if ($scope.sitePhoneNumber) fd.append('telefono', $scope.sitePhoneNumber);
            if ($scope.openingHours) fd.append('horariolocal', $scope.openingHours);
            if ($scope.businessEmail)  fd.append('correolocal', $scope.businessEmail);
            fd.append('ubicacionlocal', $scope.businessAddress);
            fd.append('categorias', $scope.businessCategories.category);
            fd.append('usuario', authenticationService.getUser().id);
            if ($scope.web) fd.append('web', $scope.web);
            if ($scope.whatsapp) fd.append('whatsapp', $scope.whatsapp);


            try {
                for (var i = 0; i <= $scope.tags.length - 1; i++) {
                    fd.append('tags', $scope.tags[i].text);
                }
            } catch (error) {
            }
        }

        function sendSiteDataToServer() {
            $http.defaults.headers.post['X-CSRFToken'] = $cookies['csrftoken'];

            $http.post(API_CONFIG.url + API_CONFIG.sitio, siteInformationService.formData,
                {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                })
                .success(function (d) {
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
                }).error(function (error) {
                console.log("hubo un error", error);
            });
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