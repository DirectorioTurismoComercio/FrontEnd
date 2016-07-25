'use strict';

angular.module('registerTrader')
    .controller('registerTradeController', function ($scope, $auth,$q,authenticationService, messageService, UserFactory,$location, $mdDialog, navigationService, $translate) {
        $scope.submitted=false;
        $scope.usuario = new UserFactory();
        $scope.traderName=undefined;
        $scope.traderLastName=undefined;
        $scope.traderEmail=undefined;
        $scope.traderPassword;
        $scope.usuario.nombres=undefined;
        $scope.registerLoading=false;
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
            $scope.submitted=true;
            if ($scope.userData.correo != undefined && $scope.userData.password != undefined && $scope.userData.nombres != undefined
            && $scope.userData.apellidos != undefined) {
                    $scope.registerLoading=true;
                    var promesa;
                    var deferred;
                                
                    setUserInfo();
                    deferred = $q.defer();
                    promesa = $scope.usuario.$save();
                    
                                      
                    promesa.then(function (data) {
                        
                                  authenticationService.setUserByToken(data.key,deferred).finally(
                                    function(){
                                    redirectToRegisterSite()
                                    }
                                  );
                            
                                 
                    }).catch(function (errors) {
                        $scope.registerLoading=false;
                        console.log("Errores retornado por el POST de agregar usuario", errors);
                        if (errors.data.error === 'E101') {
                            $mdDialog.show(
                                $mdDialog.alert()
                                    .parent(angular.element(document.querySelector('#alertPop')))
                                    .clickOutsideToClose(true)
                                    .title('Error')
                                    .content($translate.instant('E101'))
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
        }
        function setUserInfo(){
            $scope.usuario.nombres=$scope.userData.nombres;
            $scope.usuario.apellidos=$scope.userData.apellidos;
            $scope.usuario.correo=$scope.userData.correo;
            $scope.usuario.password=$scope.userData.password;
        }
        
        function redirectToRegisterSite(){
            $scope.registerLoading=false;
             navigationService.cameToBusinessInformationThrough='registertrader';
             messageService.showSuccessMessage("REGISTER_SUCCESS","SUCCESS_TITLE_MESSAGE");
             $location.path('/businessinformation');
        }
        function redirectToProfile(){
             $scope.registerLoading=false;
             $location.path('/accountinfo');
        }

    });
