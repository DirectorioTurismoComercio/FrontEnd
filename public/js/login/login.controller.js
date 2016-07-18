'use strict';

angular.module('login')
    .controller('loginController', function ($scope, Constantes, $location, $mdDialog, navBar, authenticationService, $auth, $http, API_CONFIG, $window, $q, $translate,$cookies) {
        $scope.loginLoading = false;
        $scope.submitted=false;

        $scope.login = function () {
            $scope.submitted=true;
            if ($scope.login.email != undefined && $scope.login.contrasena != undefined) {
                $scope.loginLoading = true;
                authenticationService.login({email: $scope.login.email, password: $scope.login.contrasena})
                    .then(function () {
                        redirectToProfileMain();
                    }).catch(function (error) {
                    showErrorDialog($translate.instant("BAD_LOGIN"));
                    $scope.loginLoading = false;
                });
            } else {
                showErrorDialog('Por favor ingrese usuario y contraseña');
            }
        }

        $scope.forgottenPassword = function () {
        }


        $scope.authenticate = function (provider) {
            $auth.authenticate(provider).then(function (response) {
                $scope.loginLoading = true;
                $auth.setToken(response.data.token);
                var credentials = {
                    username: response.data.username
                };
                var deferred = $q.defer()
                authenticationService.loginSocialMedia(credentials, response.data.token, deferred).finally(
                    function () {
                        redirectToProfileMain();
                    }
                );
            }).catch(function (error) {
                $scope.loginLoading = false;
                console.log('hubo un error', error);
            });
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

        function redirectToProfileMain() {
            $scope.loginLoading = false;
            $location.path('/accountinfo');
        }
    })
;
