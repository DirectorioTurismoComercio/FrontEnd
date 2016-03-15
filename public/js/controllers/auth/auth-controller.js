(function () {
    angular.module('gemStore')
        .controller('AuthController', ['$scope', 'Constantes', 'AuthFactory', 'autenticacionService', '$location', '$mdDialog', 'UserByToken', 'questionnaireService', 'navBar',
            'authenticationService', '$auth','$http', 'API_CONFIG','$window', '$q',
            function ($scope, Constantes, AuthFactory, autenticacionService, $location, $mdDialog, UserByToken, questionnaireService, navBar, authenticationService, $auth,$http,API_CONFIG,$window, $q) {
                $scope.ruta = Constantes.ruta_imagenes + "botones/";
                $scope.anterior = $scope.ruta + 'boton-regresar.png';
                $scope.load = false;
                data = {};
                $scope.toggleRight = function () {
                    navBar.open();
                }

                $scope.close = function () {
                    navBar.close();
                }

                $scope.menu_bar = function (view) {
                    questionnaireService.changeView(view);
                }

                $scope.login = function () {
                    $scope.load = true;
                    authenticationService.login({email: $scope.login.email, password: $scope.login.contrasena})
                        .then(function () {
                            autenticacionService.setInfo(authenticationService.getUser().token);
                            UserByToken.us(autenticacionService.getInfo()).query().$promise.then(function (usuario) {
                                autenticacionService.setUser(usuario);
                                $scope.load = false;
                                $location.path('/profileMain');
                            }).catch(function (error) {
                                console.log('ocurrio un error',error);
                            });
                        }).catch(function (error) {
                        showErrorDialog();
                        $scope.load = false;
                    });
                }

                $scope.forgot = function () {
                    $location.path('/auth/recovery');
                }

                $scope.authenticate = function (provider) {
                    console.log('presiono en', provider);
                    $auth.authenticate(provider).then(function (response) {
                        $auth.setToken(response.data.token);


                        console.log('se autentico en', provider, response);

                       /* autenticacionService.setInfo(response.data.token);
                        console.log('seteo el token');
                        UserByToken.us(autenticacionService.getInfo()).query().$promise.then(function (usuario) {
                            autenticacionService.setUser(usuario);
                            $scope.load = false;
                            $location.path('/profileMain');
                        }).catch(function (error) {
                            console.log('ocurrio un error',error);
                        });*/

                    }).catch(function(error){
                        console.log('hubo un error', error);
                    });
                };

                function showErrorDialog() {
                    $mdDialog.show(
                        $mdDialog.alert()
                            .parent(angular.element(document.querySelector('#alertPop')))
                            .clickOutsideToClose(true)
                            .title('Error')
                            .content('Los datos de acceso no son correctos, por favor verifique.')
                            .ariaLabel('Alert Dialog Demo')
                            .ok('Aceptar')
                            .targetEvent('$event')
                    );
                }
            }]);
})();
