'use strict';

angular.module('login')
    .controller('loginController', function ($scope, $location, $mdDialog, navBar, authenticationService, $auth, $http,
                                             API_CONFIG, $window, $q, $translate, messageService, navigationService,
                                             PopupService, UserDAO) {
            $scope.submitted = false;
            var alreadyLoggedIn = authenticationService.getUser();

            $scope.login = function () {
                $scope.submitted = true;
                if (alreadyLoggedIn) {
                    messageService.showErrorMessage("DOUBLE_LOGIN_ERROR", true);
                } else {
                    if ($scope.login.email != undefined && $scope.login.contrasena != undefined && $scope.login.contrasena.length >= 6) {
                        authenticationService.login({email: $scope.login.email, password: $scope.login.contrasena})
                            .then(function (response) {
                                $scope.user = authenticationService.getUser();
                                checkUserLogged();

                            }).catch(function (error) {
                            var disabledAccount = error.non_field_errors[0];

                            if (disabledAccount == 'User account is disabled.') {
                                PopupService.showYesMessage("DISABLED_ACCOUNT.TITLE",
                                    "DISABLED_ACCOUNT.MESSAGE",
                                    "DISABLED_ACCOUNT.CONTINUE").then(function () {
                                });
                            } else {
                                messageService.showErrorMessage("BAD_LOGIN", true);
                            }
                        });
                    } else {
                        showErrorDialog('Por favor ingrese usuario y contraseña');
                    }
                }
            };

            function checkUserLogged() {
                if ($scope.user.tipo_cuenta == "M") {
                    checkMunicipalityAccount();
                } else if (!$scope.user.es_cuenta_activa) {
                    checkInactiveAccount();
                }
                else {
                    goToProfile();
                }
            }

            function checkMunicipalityAccount() {
                showErrorDialog($translate.instant("INCORRECT_ACCOUNT_TYPE_MUNICIPALITY"));
                invalidateLogin();
            }

            function checkInactiveAccount() {
                PopupService.showYesNoMessage("REACTIVATE_ACCOUNT.TITLE", "REACTIVATE_ACCOUNT.MESSAGE",
                    "REACTIVATE_ACCOUNT.CONTINUE", "REACTIVATE_ACCOUNT.CANCEL").then(function () {
                    UserDAO.updateUser({es_cuenta_activa: true}).then(function () {
                        goToProfile();
                    });
                }).catch(function () {
                    invalidateLogin();
                });
            }

            function invalidateLogin() {
                $auth.logout();
                $auth.removeToken();
                authenticationService.logout();
            }

            $scope.forgottenPassword = function () {
                navigationService.cameToRecoveryPasswordThrough = 'BusinessUserLogin';
                $location.path('/forgotpassword');
            };


            $scope.authenticate = function (provider) {
                if (alreadyLoggedIn) {
                    messageService.showErrorMessage("DOUBLE_LOGIN_ERROR", true);
                } else {
                    $auth.authenticate(provider).then(function (response) {
                        $auth.setToken(response.data.token);
                        var credentials = {
                            username: response.data.username
                        };
                        var deferred = $q.defer()
                        authenticationService.loginSocialMedia(credentials, response.data.token, deferred).finally(
                            function () {
                                goToProfile();
                            }
                        );
                    }).catch(function (error) {
                        console.log('hubo un error', error);
                    });
                }
            };

            function showErrorDialog(message) {
                $mdDialog.show(
                    $mdDialog.alert()
                        .parent(angular.element(document.body))
                        .clickOutsideToClose(true)
                        .title('Error')
                        .content(message)
                        .ariaLabel('Alert Dialog Demo')
                        .ok('Aceptar')
                        .targetEvent('$event')
                );
            }

            function goToProfile() {
                $location.path('/accountinfo');
            }
        }
    )
;
