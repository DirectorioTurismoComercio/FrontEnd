'use strict';

angular.module('Municipality')
    .controller('municipalityAccountInfoController', function ($scope, $location,$mdDialog, municipalityInformationService, messageService, API_CONFIG, $http, ngDialog, authenticationService, formValidator, $translate) {

        $scope.showRequiredFieldMessage = false;
        $scope.user = authenticationService.getUser();
        $scope.isEditingMunicipalityInfo = false;
        $scope.isChangingPassword = false;
        $scope.changePasswordSubmitted = false;
        $scope.municipalityInfoSubmitted = false;
        var infoBackup;


        authenticationService.getUserData($scope.user.token)
            .success(function (response) {
                $scope.user = response;
            });

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

        $scope.addBusiness = function () {
            municipalityInformationService.resetData();
            $location.path('municipalityinfo');
        }
        $scope.editSite = function (sitio) {

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


        $scope.$on('$routeChangeStart', function (scope, next, current) {
            if (next.$$route.controller == 'municipalityphotos' || next.$$route.controller == 'loginmunicipality') {
                $location.path('/home');
            }
        });

});