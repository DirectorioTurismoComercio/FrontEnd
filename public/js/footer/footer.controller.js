angular.module('appFooter')
    .controller('footerController', function ($scope, authenticationService, messageService, $location) {

        var alreadyLoggedIn = authenticationService.getUser();

        $scope.goToRegisterTrader=function(){
            if(alreadyLoggedIn){
                messageService.showErrorMessage("DOUBLE_REGISTER_ERROR");
            }else{
                $location.path('/registertrader');
            }
        }


        $scope.goToRegisterMunicipality=function(){
            if(alreadyLoggedIn){
                messageService.showErrorMessage("DOUBLE_REGISTER_ERROR");
            }else{
                $location.path('/registermunicipality');
            }
        }


    });

