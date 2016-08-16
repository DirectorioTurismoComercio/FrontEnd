'use strict';

angular.module('registerTrader')
    .controller('registerTradeController', function ($scope, $auth, $q, authenticationService, messageService, $http,
                                                     $location, $mdDialog, navigationService, $translate, API_CONFIG, ngDialog, formValidator) {
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

        $scope.$watch('userData.correo', function() {
            try{
                $scope.isValidEmail=formValidator.isValidEmail($scope.userData.correo);
            }catch (e){}
        });

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
            if ($scope.userData.correo != undefined && $scope.isValidEmail && $scope.userData.password != undefined && $scope.userData.password.length >= 6  && $scope.userData.nombres != undefined
            && $scope.userData.apellidos != undefined) {
                    $scope.registerLoading=true;
                    var promesa;
                    var deferred;
                                
                    deferred = $q.defer();
                    promesa = $http.post(API_CONFIG.url + API_CONFIG.user, {email:$scope.userData.correo, last_name: $scope.userData.apellidos, first_name: $scope.userData.nombres, password1: $scope.userData.password, password2: $scope.userData.password} );
                    
                                      
                    promesa.then(function (reponse) {
                                  authenticationService.setUserByToken(reponse.data.key,deferred).finally(
                                    function(){
                                    redirectToRegisterSite()
                                    }
                                  );
                            
                                 
                    }).catch(function (errors) {
                        $scope.registerLoading=false;
                        console.log("Errores retornado por el POST de agregar usuario", errors);
                        formValidator.emailAlreadyExistsShowError(errors);
                    });
                };
        }

        $scope.doneRegistration = function () {
            ngDialog.close();
            $location.path('/businessinformation');
        }

        function redirectToRegisterSite(){
            $scope.registerLoading=false;
            navigationService.cameToBusinessInformationThrough='registertrader';
            ngDialog.open({
                template: 'js/registerTrader/completeTraderRegistration.html',
                width: 'auto',
                showClose: false,
                scope: $scope,
                closeByEscape: false,
                closeByDocument: false
            });
        }
        function redirectToProfile(){
             $scope.registerLoading=false;
             $location.path('/accountinfo');
        }

    });
