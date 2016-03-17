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
                    if($scope.login.email!=undefined && $scope.login.contrasena!=undefined){
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
                            showErrorDialog('Los datos de acceso no son correctos, por favor verifique.');
                            $scope.load = false;
                        });
                    }else{
                        showErrorDialog('Por favor ingrese usuario y contraseña');
                    }
                }

                $scope.forgot = function () {
                    $location.path('/auth/recovery');
                }

                $scope.authenticate = function (provider) {
                    console.log('presiono en', provider);
                    $auth.authenticate(provider).then(function (response) {
                        $auth.setToken(response.data.token);


                        console.log('se autentico en', provider, response);

                        console.log("el token de red social", response.data.token);




                        $http.get(API_CONFIG.url + API_CONFIG.user, { headers: {'Authorization': 'Token ' + response.data.token} })
                            .success(function(response){
                                console.log("se autentico en ususarios");
                               /* user = response;
                                user.token = token;
                                user.name = credentials.username;
                                $window.sessionStorage["user"] = JSON.stringify(user);
                                deferred.resolve();*/
                            });


                    }).catch(function(error){
                        console.log('hubo un error', error);
                    });
                };

                $scope.logout=function(){
                    $auth.removeToken();
                }

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
            }]);
})();
