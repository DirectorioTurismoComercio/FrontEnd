'use strict';

angular.module('forgotPassword')
    .controller('forgotPasswordController', function ($scope, messageService, navigationService, $location) {
        $scope.submitted = false;

        $scope.recoveryPasswordField = {
            email:undefined
        };

        $scope.sendRecoveryPasswordEmail=function(){
            $scope.submitted = true;

            if(!$scope.recoveryPasswordField.email){
                messageService.showErrorMessage("RECOVERY_PASSWORD_FIELDS_INCOMPLETE",true);
            }else{
                messageService.showSuccessMessage("EMAIL_SENDED_TEXT","EMAIL_SENDED");
                $scope.goBack();
            }
        }

        $scope.goBack = function(){
            navigationService.cameToRecoveryPasswordThrough=="MunicipalityUserLogin" ? $location.path('/loginmunicipality') :  $location.path('/login');
        }
    });
