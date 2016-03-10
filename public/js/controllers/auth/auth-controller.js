(function () {
    angular.module('gemStore')
        .controller('AuthController', ['$scope', 'Constantes', 'AuthFactory', 'autenticacionService', '$location', '$mdDialog', 'UserByToken', 'questionnaireService', 'navBar',
            'authenticationService',
            function ($scope, Constantes, AuthFactory, autenticacionService, $location, $mdDialog, UserByToken, questionnaireService, navBar, authenticationService) {
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

                $scope.facebookLogin = function () {
                    FB.login(function(response){
                        console.log('la respuesta es', response);
                        if (response.authResponse){
                            console.log('Welcome Fetching your information...');
                            FB.api('/me',function(response){
                                console.log('Good to see you ' + response.name + '//' + response.email +'//');

                                console.log(JSON.stringify(response));

                                var accessToken=FB.getAuthResponse();
                                console.log('El token es', accessToken);

                            },{
                                scope: 'public_profile,email',
                                return_scopes: true
                            });
                        }else{
                            console.log('User cancelled login or did not fully authorize');
                        }
                    });
                }

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
