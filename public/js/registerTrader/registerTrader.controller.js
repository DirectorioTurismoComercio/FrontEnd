'use strict';

angular.module('registerTrader')
    .controller('registerTradeController', function ($scope, $auth,$q,authenticationService, messageService, $http, 
        $location, $mdDialog, navigationService, $translate, API_CONFIG) {
        $scope.submitted=false;
        $scope.traderName=undefined;
        $scope.traderLastName=undefined;
        $scope.traderEmail=undefined;
        $scope.traderPassword;
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
                                
                    deferred = $q.defer();
                    console.log($scope.userData)
                    promesa = $http.post(API_CONFIG.url + API_CONFIG.user, {email:$scope.userData.correo, last_name: $scope.userData.apellidos, first_name: $scope.userData.nombres, password1: $scope.userData.password, password2: $scope.userData.password} );//$scope.usuario.$save();
                    
                                      
                    promesa.then(function (reponse) {
                        console.log(reponse)
                                  authenticationService.setUserByToken(reponse.data.key,deferred).finally(
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
                    });
                };
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
