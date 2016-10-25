'use strict';

angular.module('Municipality')
    .controller('loginMunicipalityController', function ($scope, $auth, authenticationService,
                                                         $mdDialog, messageService, $translate,
                                                         $location, navigationService, PopupService) {
        $scope.submitted = false;

        $scope.loginMunicipalityFields = {
            email: undefined,
            password: undefined
        };

        var alreadyLoggedIn = authenticationService.getUser();

        $scope.forgottenPassword = function () {
            navigationService.cameToRecoveryPasswordThrough = "MunicipalityUserLogin";
            $location.path('/forgotpassword');
        }

        $scope.loginMunicipality = function () {
            $scope.submitted = true;
            if (alreadyLoggedIn) {
                messageService.showErrorMessage("DOUBLE_LOGIN_ERROR", true);
            } else {
                if ($scope.loginMunicipalityFields.email != undefined && $scope.loginMunicipalityFields.password != undefined && $scope.loginMunicipalityFields.password.length >= 6) {
                    authenticationService.login({
                            email: $scope.loginMunicipalityFields.email,
                            password: $scope.loginMunicipalityFields.password
                        })
                        .then(function () {
                            $scope.user = authenticationService.getUser();
                            checkUserLogged();
                        }).catch(function (error) {
                        messageService.showErrorMessage("BAD_LOGIN", true);
                    });
                }
                else {
                    messageService.showErrorMessage("LOGIN_FIELDS_INCOMPLETE", true);
                }
            }
        };

        function checkUserLogged() {
            if ($scope.user.tipo_cuenta != "M") {
                checkMunicipalityAccount();
            } else if (!$scope.user.es_cuenta_activa) {
                checkInactiveAccount();
            }
            else {
                redirectToProfileMain();
            }
        }

        function checkMunicipalityAccount() {
            showErrorDialog($translate.instant("INCORRECT_ACCOUNT_TYPE_TRADER"));
            invalidateLogin();
        }

        function checkInactiveAccount() {
            PopupService.showYesMessage("REACTIVATE_MUNICIPALITY_ACCOUNT.TITLE",
                "REACTIVATE_MUNICIPALITY_ACCOUNT.MESSAGE",
                "REACTIVATE_MUNICIPALITY_ACCOUNT.CONTINUE").then(function () {
                invalidateLogin();

            });
        }

        function invalidateLogin() {
            $auth.logout();
            $auth.removeToken();
            authenticationService.logout().then(function(){
                $location.path('/home');
            });
        }

        function redirectToProfileMain() {
            $location.path('/municipalityaccountinfo');
        }

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

    });
