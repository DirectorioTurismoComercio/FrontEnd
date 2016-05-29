'use strict';

angular.module('registerTrader')
    .controller('registerTradeController', function ($scope, $auth,$q,authenticationService, UserFactory) {
        $scope.usuario = new UserFactory();
        $scope.traderName=undefined;
        $scope.traderLastName=undefined;
        $scope.traderEmail=undefined;
        $scope.traderPassword;
        authenticationService.logout();
    


        $scope.authenticate = function (provider) {
                        $auth.authenticate(provider).then(function (response) {
                        $scope.load = true;
                        $auth.setToken(response.data.token);
                        var credentials = {
                            username: response.data.username
                        };
                        var deferred = $q.defer()
                        authenticationService.loginSocialMedia(credentials, response.data.token, deferred).finally(
                            function (){
                                redirectToRegisterSite();
                            }
                        );
                    }).catch(function (error) {
                        console.log('hubo un error', error);
                    });
                };

        $scope.save =function () {
                    var promesa;

                    var credentials = {
                            email: $scope.usuario.correo,
                            password: $scope.usuario.password
                        };                  
                    promesa = $scope.usuario.$save();
                    
                    var deferred = $q.defer();
                    promesa.then(function (data) {
                                  authenticationService.setUserByToken(data.key,deferred).finally(
                                    function(){
                                  redirectToRegisterSite()
                                    }
                                  );
                            
                    
                                 
                    }).catch(function (errors) {
                        console.log("Errores retornado por el POST de agregar usuario", errors);
                        if (errors.status === 400) {
                            $mdDialog.show(
                                $mdDialog.alert()
                                    .parent(angular.element(document.querySelector('#alertPop')))
                                    .clickOutsideToClose(true)
                                    .title('Error')
                                    .content('El correo indicado ya existe, por favor cambielo e intentelo nuevamente.')
                                    .ariaLabel('Alert Dialog Demo')
                                    .ok('Aceptar')
                                    .targetEvent('$event')
                            );
                        } else {
                        }
                        ;
                    }).finally(function () {
                    });
                };
        function redirectToRegisterSite(){
             $scope.load = false;
             $location.path('/registersite');
        }

    });
