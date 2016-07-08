'use strict';

angular.module('registerTrader')
    .controller('registerTradeController', function ($scope, $auth,$q,authenticationService, UserFactory,$location, $mdDialog, navigationService) {
        $scope.submitted=false;
        $scope.usuario = new UserFactory();
        $scope.traderName=undefined;
        $scope.traderLastName=undefined;
        $scope.traderEmail=undefined;
        $scope.traderPassword;
        $scope.usuario.nombres=undefined;

        $scope.userData={
            nombres:undefined,
            apellidos:undefined,
            correo:undefined,
            password:undefined
        }


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
                                if(authenticationService.getUser().sitios.length==0){
                                redirectToRegisterSite();
                                }
                                else{
                                redirectToProfile();    
                                }

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
                        setUserInfo();
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

        function setUserInfo(){
            $scope.usuario.nombres=$scope.userData.nombres;
            $scope.usuario.apellidos=$scope.userData.apellidos;
            $scope.usuario.correo=$scope.userData.correo;
            $scope.usuario.password=$scope.userData.password;
        }
        
        function redirectToRegisterSite(){
             $scope.load = false;
             navigationService.cameToBusinessInformationThrough='registertrader';
             $location.path('/businessinformation');
        }
        function redirectToProfile(){
             $scope.load = false;
             $location.path('/accountinfo');
        }

    });
