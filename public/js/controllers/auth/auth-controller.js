(function () {
    angular.module('gemStore')
        .controller('AuthController', ['$scope', 'Constantes', 'AuthFactory', 'autenticacionService', '$location', '$mdDialog', 'UserByToken', 'questionnaireService', 'navBar',
            'authenticationService','$auth',
            function ($scope, Constantes, AuthFactory, autenticacionService, $location, $mdDialog, UserByToken, questionnaireService, navBar, authenticationService, $auth) {
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
                            console.log(autenticacionService);
                            autenticacionService.setInfo(authenticationService.getUser().token);
                            UserByToken.us(autenticacionService.getInfo()).query().$promise.then(function (usuario) {
                                autenticacionService.setUser(usuario);
                                $scope.load = false;
                                $location.path('/profileMain');
                            }).catch(function (error) {
                                console.log(error);
                            });
                        }).catch(function (error) {
                        showErrorDialog();
                        $scope.load = false;
                    });
                }

                $scope.forgot = function () {
                    $location.path('/auth/recovery');
                }

                $scope.authenticate = function(provider) {
                    console.log('se entra a satellizer!!!!');
                    $auth.authenticate(provider);
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
