'use strict';

angular.module('registerTrader')
    .controller('registerTradeController', function ($scope, $auth,$q,authenticationService, UserFactory,$location, $mdDialog) {
        $scope.submitted=false;
        $scope.usuario = new UserFactory();
        $scope.traderName=undefined;
        $scope.traderLastName=undefined;
        $scope.traderEmail=undefined;
        $scope.traderPassword;
        authenticationService.logout();
        $scope.usuario.nombres=undefined;


        $scope.changeView = function (view) {
            $location.path(view);
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
                    $scope.submitted=true;
                    var deferred;
                    var credentials;
                    if($scope.traderInfoForm.$valid){
                        deferred = $q.defer();
                        promesa = $scope.usuario.$save();
                    
                 
                    credentials = {
                            email: $scope.usuario.correo,
                            password: $scope.usuario.password
                        };   
                    }                   
                    
                    
                     
                    promesa.then(function (data) {
                                  authenticationService.setUserByToken(data.key,deferred).finally(
                                    function(){
                                    console.log("usuario id",authenticationService);
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
             $location.path('/businessinformation');
        }


    });
