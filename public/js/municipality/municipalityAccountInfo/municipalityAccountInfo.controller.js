'use strict';

angular.module('Municipality')
    .controller('municipalityAccountInfoController', function ($scope, $location,$mdDialog, filterFilter, siteInformationService, municipalityInformationService, messageService, API_CONFIG, $http, ngDialog, authenticationService, formValidator, $translate) {

        $scope.showRequiredFieldMessage = false;
        $scope.user = authenticationService.getUser();
        $scope.isEditingMunicipalityInfo = false;
        $scope.isChangingPassword = false;
        $scope.changePasswordSubmitted = false;
        $scope.municipalityInfoSubmitted = false;
        $scope.routes=[];
        var infoBackup;


        authenticationService.getUserData($scope.user.token)
            .success(function (response) {
                var muncipalitySite;
                $scope.user = response;
                muncipalitySite = filterFilter($scope.user.sitios, {tipo_sitio: 'M'});
                municipalityInformationService.setMunicipalitySite(muncipalitySite[0]);
                if(muncipalitySite.length>0){
                    $scope.routes=muncipalitySite[0].rutas;
                }

                splitSites();

            });

        function  splitSites(){
            $scope.municipalitySites=[];
            $scope.addedMunicipalityes=[];
            for(var i=0; i<$scope.user.sitios.length; i++){
                if($scope.user.sitios[i].tipo_sitio=='S'){
                    $scope.municipalitySites.push($scope.user.sitios[i]);
                }

                if($scope.user.sitios[i].tipo_sitio=='M'){
                    $scope.addedMunicipalityes.push($scope.user.sitios[i]);
                    municipalityInformationService.setMunicipalityName($scope.user.sitios[i].municipio);
                }
            }
        }

        $scope.$watch('user.email', function () {
            $scope.isValidEmail = formValidator.isValidEmail($scope.user.email);
        });


        $scope.editMunicipalitylInfo = function () {
            $scope.isEditingMunicipalityInfo = true;
            $scope.isChangingPassword = false;
            infoBackup = angular.copy($scope.user);
        };

        $scope.cancelEditing = function () {
            $scope.isEditingMunicipalityInfo = false;
            $scope.isChangingPassword = false;
            $scope.user = angular.copy(infoBackup);
        };

        $scope.saveMunicipalityInfo = function () {
            $scope.isValidEmail = formValidator.isValidEmail($scope.user.email);
            $scope.municipalityInfoSubmitted = true;
            if ($scope.personalInfoForm.$valid && $scope.isValidEmail) {
                $http.put(API_CONFIG.url + API_CONFIG.user_detail,
                    {
                        email: $scope.user.email,
                        last_name: $scope.user.first_name,
                        first_name: $scope.user.first_name
                    },
                    {
                        headers: {
                            'Authorization': 'Token ' + authenticationService.getUser().token
                        }
                    }
                    )
                    .then(function (response) {
                            $scope.isEditingMunicipalityInfo = false;
                            $scope.municipalityInfoSubmitted = false;
                            authenticationService.setUser(response.data, authenticationService.getUser().token);
                            showMessageDialog('', $translate.instant('ACCOUNT_INFO.ACCOUNT_INFORMATION_SUCCESSFULLY_UPDATED'));
                        }
                    )
                    .catch(
                        function (errors) {
                            console.log("Errores retornado por el servidor", errors);
                            formValidator.emailAlreadyExistsShowError(errors);
                        }
                    );
            }

        }
        $scope.changePassword = function () {
            $scope.isChangingPassword = true;
            $scope.isEditingMunicipalityInfo = false;
            infoBackup = angular.copy($scope.user);
        };

        $scope.saveNewPassword = function () {
            $scope.changePasswordSubmitted = true;
            if ($scope.passwordForm.$valid && $scope.user.newpassword == $scope.user.confirmnewpassword
                && $scope.user.newpassword.length >= 6 && $scope.user.newpassword != $scope.user.password) {
                $http.post(API_CONFIG.url + API_CONFIG.new_password,
                    {
                        old_password: $scope.user.password,
                        new_password1: $scope.user.newpassword,
                        new_password2: $scope.user.newpassword
                    },
                    {
                        headers: {
                            'Authorization': 'Token ' + authenticationService.getUser().token
                        }
                    }
                    )
                    .then(function (response) {
                            $scope.changePasswordSubmitted = false;
                            $scope.isChangingPassword = false;
                            $scope.user.newpassword = "";
                            $scope.user.confirmnewpassword = "";
                            $scope.user.password = "";
                            $scope.passwordForm.$setPristine();
                            showMessageDialog('', $translate.instant('ACCOUNT_INFO.ACCOUNT_PASSWORD_SUCCESSFULLY_UPDATED'));
                        }
                    )
                    .catch(
                        function (errors) {

                            console.log("Errores retornado por el POST al cambiar contraseña", errors);
                            var error_message = 'E103';
                            if (errors.data.email) {
                                if (errors.data.old_passwordl[0] === 'E103') {
                                    error_message = 'E103';
                                }
                            }
                            showMessageDialog('Error', $translate.instant(error_message));

                        }
                    );
            }
        }
        function showMessageDialog(title, message) {
            $mdDialog.show(
                $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#alertPop')))
                    .clickOutsideToClose(true)
                    .title(title)
                    .content(message)
                    .ariaLabel('Alert Dialog Demo')
                    .ok('Aceptar')
                    .targetEvent('$event')
            );
        }

        $scope.addMunicipality = function () {
            municipalityInformationService.resetData();
            $location.path('municipalityinfo');
        }

        $scope.addRoute = function(){
            municipalityInformationService.currentRoute=undefined;
            $location.path('municipalityroute');

        }
        $scope.editRoute = function(route){
            municipalityInformationService.setCurrentRoute(route);
            $location.path('municipalityroute');

        }

        $scope.addBusiness=function(){
            siteInformationService.clearData(siteInformationService);
            $location.path('businessinformation');
        }

        $scope.editMunicipality = function (sitio) {

            municipalityInformationService.setMunicipalityId(sitio.id);
            municipalityInformationService.setMunicipalityPhoneNumber(sitio.telefono);
            municipalityInformationService.setMunicipalityWhatsapp(sitio.whatsapp);
            municipalityInformationService.setMunicipalityWeb(sitio.web);
            municipalityInformationService.setMunicipalityOpeningHours(sitio.horariolocal);
            municipalityInformationService.setMunicipalitySelected(sitio.municipio);
            municipalityInformationService.setMunicipalityDescription(sitio.descripcion);
            municipalityInformationService.setMunicipalityAddress(sitio.ubicacionlocal);
            municipalityInformationService.setMunicipalityLocation({lat: parseFloat(sitio.latitud), lng: parseFloat(sitio.longitud)});
            municipalityInformationService.setMunicipalityURLPhotos(sitio.fotos);

            $location.path('/municipalityinfo');
        }

        $scope.editSite = function (sitio) {
            var siteCategories = [];
            var firstCategory, secondCategory, thirdCategory;
            siteInformationService.siteId = sitio.id;
            siteInformationService.sitePhoneNumber = sitio.telefono;
            siteInformationService.whatsapp = sitio.whatsapp;
            siteInformationService.web = sitio.web;
            siteInformationService.openingHours = sitio.horariolocal;
            siteInformationService.businessName = sitio.nombre;
            siteInformationService.businessLocation = {lat: parseFloat(sitio.latitud), lng: parseFloat(sitio.longitud)};
            siteInformationService.businessDescription = sitio.descripcion;
            siteInformationService.tags = sitio.tags;
            siteInformationService.businessEmail = sitio.correolocal;
            siteInformationService.businessAddress = sitio.ubicacionlocal;
            siteInformationService.businessCategories = {id: sitio.categorias[0]};
            siteInformationService.URLphotos = sitio.fotos;
            siteInformationService.businessMunicipality = sitio.municipio;
            firstCategory = filterFilter(sitio.categorias, {tipo: 1})[0]
            secondCategory = filterFilter(sitio.categorias, {tipo: 2})[0]
            thirdCategory = filterFilter(sitio.categorias, {tipo: 3})[0]
            if (firstCategory) siteInformationService.firstCategory = firstCategory.categoria;
            if (secondCategory) siteInformationService.secondCategory = secondCategory.categoria;
            if (thirdCategory) siteInformationService.thirdCategory = thirdCategory.categoria;

            for (var i = 0; i < sitio.categorias.length; i++) {
                siteCategories.push(sitio.categorias[i].categoria);
            }

            siteInformationService.businessSubcategories = {subcategories: siteCategories};
            $location.path('businessinformation');
        }

        $scope.deleteSite = function (sitio) {
            messageService.confirmMessage($translate.instant("CONFIRM_DELETE_SITE"), $translate.instant("DELETE_SITE"), removeSiteFromServer, sitio);

        }

        $scope.deleteRoute = function (route){
            messageService.confirmMessage($translate.instant("CONFIRM_DELETE_ROUTE"), $translate.instant("DELETE_ROUTE"), removeRouteFromServer, route);

        }

        function removeSiteFromServer(sitio) {
            $http.delete(API_CONFIG.url + API_CONFIG.siteDetail + sitio.id,
                {
                    headers: {'Authorization': 'Token ' + authenticationService.getUser().token}
                }).success(function (d) {
                $scope.municipalitySites.splice($scope.municipalitySites.indexOf(sitio), 1);
            }).error(function (error) {
                console.log("hubo un error al borrar", error);

            });
        }

        function removeRouteFromServer(route) {
            $http.delete(API_CONFIG.url + API_CONFIG.updateRoute + route.id,
                {
                    headers: {'Authorization': 'Token ' + authenticationService.getUser().token}
                }).success(function (d) {
                $scope.routes.splice($scope.routes.indexOf(route), 1);
            }).error(function (error) {
                console.log("hubo un error al borrar", error);

            });
        }

        $scope.$on('$routeChangeStart', function (scope, next, current) {
            if (next.$$route.controller == 'municipalityphotos' || next.$$route.controller == 'loginmunicipality') {
                $location.path('/home');
            }
        });

});