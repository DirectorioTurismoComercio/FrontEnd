angular.module('appFooter')
    .controller('footerController', function ($scope, authenticationService, messageService, $location) {

        var loggedUser = authenticationService.getUser();

        $scope.goToRegisterTrader = function (path) {
            checkLoggedUserForRegistration(path);
        };


        $scope.goToRegisterMunicipality = function (path) {
            checkLoggedUserForRegistration(path);
        };

        $scope.goToLoginTrader = function () {
            checkLoggedUserForLogIn("C",'/login','/accountinfo');
        };

        $scope.goToLoginMunicipality = function (){
            checkLoggedUserForLogIn("M",'/loginmunicipality','/municipalityaccountinfo');
        };

        function checkLoggedUserForRegistration(path){
            if (loggedUser) {
                messageService.showErrorMessage("DOUBLE_REGISTER_ERROR");
            } else {
                $location.path(path);
            }
        }

        function checkLoggedUserForLogIn(accountType, pathLogin, pathAccountInfo){
            if (loggedUser) {
                if(loggedUser.tipo_cuenta==accountType){
                    $location.path(pathAccountInfo);
                }else{
                    messageService.showErrorMessage("DOUBLE_LOGIN_ERROR");
                }
            } else {
                $location.path(pathLogin);
            }
        }

    });

