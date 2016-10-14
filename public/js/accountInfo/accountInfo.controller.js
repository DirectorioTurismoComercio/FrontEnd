'use strict';
angular.module('accountInfo')
    .controller('AccountInfoController', function ($scope, $location, $http,
                                                   authenticationService, navigationService, siteInformationService,
                                                   messageService, filterFilter, API_CONFIG, $mdDialog, $translate,
                                                   formValidator, ngDialog, $auth, municipalityInformationService,
                                                   $route) {

            $scope.showRequiredFieldMessage = false;
            $scope.usuario = authenticationService.getUser();
            $scope.isEditingPersonalInfo = false;
            $scope.isChangingPassword = false;
            $scope.changePasswordSubmitted = false;
            $scope.personalInfoSubmitted = false;
            var infoBackup;


            authenticationService.getUserData($scope.usuario.token)
                .success(function (response) {
                    $scope.usuario = response;
                });

            $scope.$watch('usuario.email', function () {
                $scope.isValidEmail = formValidator.isValidEmail($scope.usuario.email);
            });


            $scope.editPersonalInfo = function () {
                $scope.isEditingPersonalInfo = true;
                $scope.isChangingPassword = false;
                infoBackup = angular.copy($scope.usuario);
            };

            $scope.cancelEditing = function () {
                $scope.isEditingPersonalInfo = false;
                $scope.isChangingPassword = false;
                $scope.usuario = angular.copy(infoBackup);
            };

            $scope.savePersonalInfo = function () {
                $scope.isValidEmail = formValidator.isValidEmail($scope.usuario.email);
                $scope.personalInfoSubmitted = true;
                if ($scope.personalInfoForm.$valid && $scope.isValidEmail) {
                    $http.put(API_CONFIG.url + API_CONFIG.user_detail,
                        {
                            email: $scope.usuario.email,
                            last_name: $scope.usuario.last_name,
                            first_name: $scope.usuario.first_name
                        },
                        {
                            headers: {
                                'Authorization': 'Token ' + authenticationService.getUser().token
                            }
                        }
                        )
                        .then(function (response) {
                                $scope.isEditingPersonalInfo = false;
                                $scope.personalInfoSubmitted = false;
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
                $scope.isEditingPersonalInfo = false;
                infoBackup = angular.copy($scope.usuario);
            };

            $scope.saveNewPassword = function () {
                $scope.changePasswordSubmitted = true;
                if ($scope.passwordForm.$valid && $scope.usuario.newpassword == $scope.usuario.confirmnewpassword
                    && $scope.usuario.newpassword.length >= 6 && $scope.usuario.newpassword != $scope.usuario.password) {
                    $http.post(API_CONFIG.url + API_CONFIG.new_password,
                        {
                            old_password: $scope.usuario.password,
                            new_password1: $scope.usuario.newpassword,
                            new_password2: $scope.usuario.newpassword
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
                                $scope.usuario.newpassword = "";
                                $scope.usuario.confirmnewpassword = "";
                                $scope.usuario.password = "";
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
                navigationService.cameToBusinessInformationThrough = 'accountinfo';
                siteInformationService.clearData(siteInformationService);
                $location.path('businessinformation');
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
                messageService.confirmMessage("¿Está seguro que desea borrar este sitio?", "Borrar sitio", removeSiteFromServer, sitio);

            }
            function removeSiteFromServer(sitio) {
                $http.delete(API_CONFIG.url + "/sitio/detail/" + sitio.id,
                    {
                        headers: {'Authorization': 'Token ' + authenticationService.getUser().token}
                    }).success(function (d) {
                    $scope.usuario.sitios.splice($scope.usuario.sitios.indexOf(sitio), 1);
                }).error(function (error) {
                    console.log("hubo un error al borrar", error);

                });


            }

            $scope.isResgisteredWithSocialNetwork = function () {
                return $scope.usuario.social_auth.length > 0;
            };

            $scope.$on('$routeChangeStart', function (scope, next, current) {
                if (next.$$route.controller == 'summaryController' || next.$$route.controller == 'loginController') {
                    $location.path('/home');
                }
            });

            $scope.deleteAccount = function () {
                $http.patch(API_CONFIG.url + API_CONFIG.user_detail, {
                        es_cuenta_activa: false
                    },
                    {
                        headers: {
                            'Authorization': 'Token ' + authenticationService.getUser().token
                        }
                    }).then(function (response) {
                    logOut();
                });
            };

            function logOut() {
                $auth.logout();
                $auth.removeToken();
                siteInformationService.clearData();
                municipalityInformationService.resetData();
                ngDialog.close();
                authenticationService.logout().then(function () {
                    $location.path('home');
                    $route.reload();
                });
            }

            $scope.closeDialog = function () {
                ngDialog.close();
            };

            $scope.showDialogDeleteAccount = function () {
                ngDialog.open({
                    template: 'js/accountInfo/deleteAccount.html',
                    width: 'auto',
                    showClose: false,
                    scope: $scope,
                    closeByEscape: true,
                    closeByDocument: true
                });
            }
        }
    );
