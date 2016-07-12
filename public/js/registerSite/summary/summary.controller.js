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
        var fd = new FormData();

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
            fd.append('latitud', $scope.businessLocation.lat);
            fd.append('longitud', $scope.businessLocation.lng);
            fd.append('nombre', $scope.businessName);
            fd.append('descripcion', $scope.businessDescription);
            fd.append('municipio_id', $scope.businessMunicipality.id);
            if ($scope.sitePhoneNumber) fd.append('telefono', $scope.sitePhoneNumber);
            if ($scope.openingHours) fd.append('horariolocal', $scope.openingHours);
            if ($scope.businessEmail)  fd.append('correolocal', $scope.businessEmail);
            fd.append('ubicacionlocal', $scope.businessAddress);
            fd.append('categorias', $scope.businessCategories.id);
            fd.append('usuario', authenticationService.getUser().id);
            if ($scope.web) fd.append('web', $scope.web);
            if ($scope.whatsapp) fd.append('whatsapp', $scope.whatsapp);


            try {
                for (var i = 0; i <= $scope.tags.length - 1; i++) {
                    fd.append('tags', $scope.tags[i].text);
                }
            } catch (error) {
            }

            appendPhotos( siteInformationService.mainPhoto, 'fotos_PRINCIPAL', fd);
            appendPhotos( siteInformationService.facadePhotos, 'fotos_FACHADA', fd);
            appendPhotos(siteInformationService.insidePhotos, 'fotos_INTERIOR', fd);
            appendPhotos(siteInformationService.productsPhotos, 'fotos_PRODUCTOS', fd);


        }

        function appendPhotos(arrayPhotos, model, fd) {
            var photosCounter = 0;
            angular.forEach(arrayPhotos, function (file) {
                fd.append(model + photosCounter, file.file);
                photosCounter++;
            });
        }

        function sendSiteDataToServer() {
            $http.defaults.headers.post['X-CSRFToken'] = $cookies['csrftoken'];
            var promise;
            if(siteInformationService.siteId){
                promise = $http.put(API_CONFIG.url + API_CONFIG.sitio+"/detail/"+siteInformationService.siteId, fd,
                {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                });
            }else{
                promise = $http.post(API_CONFIG.url + API_CONFIG.sitio, fd,
                {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                });

            }
            promise.success(function (d) {
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
            siteInformationService.mainPhoto=[];
            siteInformationService.facadePhotos=[];
            siteInformationService.insidePhotos=[];
            siteInformationService.productsPhotos=[];
        }

    });