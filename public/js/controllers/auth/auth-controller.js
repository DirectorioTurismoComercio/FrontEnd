(function () {
    angular.module('gemStore')
        .controller('AuthController', ['$scope', 'Constantes', '$location', '$mdDialog', 'navBar',
            'authenticationService', '$auth', '$http', 'API_CONFIG', '$window', '$q', 'registroService',
            function ($scope, Constantes, $location, $mdDialog, navBar, authenticationService, $auth, $http, API_CONFIG, $window, $q, registroService) {
                $scope.load = false;


                $scope.login = function () {
                    if ($scope.login.email != undefined && $scope.login.contrasena != undefined) {
                        $scope.load = true;
                        authenticationService.login({email: $scope.login.email, password: $scope.login.contrasena})
                            .then(function () {
                                redirectToProfileMain();
                            }).catch(function (error) {
                            showErrorDialog('Los datos de acceso no son correctos, por favor verifique.');
                            $scope.load = false;
                        });
                    } else {
                        showErrorDialog('Por favor ingrese usuario y contraseña');
                    }
                }

                $scope.forgottenPassword = function () {
                }


                $scope.authenticate = function (provider) {
                    $auth.authenticate(provider).then(function (response) {
                        $scope.load = true;
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
                };

                function showErrorDialog(message) {
                    $mdDialog.show(
                        $mdDialog.alert()
                            .parent(angular.element(document.querySelector('#alertPop')))
                            .clickOutsideToClose(true)
                            .title('Error')
                            .content(message)
                            .ariaLabel('Alert Dialog Demo')
                            .ok('Aceptar')
                            .targetEvent('$event')
                    );
                }

                function redirectToProfileMain() {
                    $scope.load = false;
                    $location.path('/profileMain');
                }

            }]);
})();
