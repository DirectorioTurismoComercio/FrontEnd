'use strict';

angular.module('login')
    .controller('loginController', function ($scope,  $location, $mdDialog, navBar, authenticationService, $auth, $http, API_CONFIG, $window, $q, $translate,messageService) {
        $scope.submitted=false;
        var alreadyLoggedIn = authenticationService.getUser();

        $scope.login = function () {
            $scope.submitted=true;
            if(alreadyLoggedIn){
                messageService.showErrorMessage("DOUBLE_LOGIN_ERROR", true);
            }else{
                if ($scope.login.email != undefined && $scope.login.contrasena != undefined && $scope.login.contrasena.length >= 6) {
                    authenticationService.login({email: $scope.login.email, password: $scope.login.contrasena})
                        .then(function (response) {
                            $scope.user = authenticationService.getUser();
                            if($scope.user.tipo_cuenta=="M"){
                                showErrorDialog($translate.instant("INCORRECT_ACCOUNT_TYPE_MUNICIPALITY"));
                                $auth.logout();
                                $auth.removeToken();
                                authenticationService.logout();
                            }else{
                                redirectToProfileMain();
                            }
                        }).catch(function (error) {
                        showErrorDialog($translate.instant("BAD_LOGIN"));
                    });
                } else {
                    showErrorDialog('Por favor ingrese usuario y contraseña');
                }
            }
        }

        $scope.forgottenPassword = function () {
        }


        $scope.authenticate = function (provider) {
            if(alreadyLoggedIn){
                messageService.showErrorMessage("DOUBLE_LOGIN_ERROR", true);
            }else{
                $auth.authenticate(provider).then(function (response) {
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

        function redirectToProfileMain() {
            $location.path('/accountinfo');
        }
    })
;
