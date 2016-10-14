'use strict';

angular.module('forgotPassword')
    .controller('forgotPasswordController', function ($scope, messageService) {
        $scope.submitted = false;

        $scope.recoveryPasswordField = {
            email:undefined
        };

        $scope.sendRecoveryPasswordEmail=function(){
            $scope.submitted = true;
            
            if(!$scope.recoveryPasswordField.email){
                messageService.showErrorMessage("RECOVERY_PASSWORD_FIELDS_INCOMPLETE",true);
            }else{

            }
        }
    });
