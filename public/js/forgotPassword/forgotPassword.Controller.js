'use strict';

angular.module('forgotPassword')
    .controller('forgotPasswordController', function ($scope, messageService, $mdDialog,
        navigationService, $location,$translate, $http, API_CONFIG) {
        $scope.submitted = false;

        $scope.recoveryPasswordField = {
            email:undefined
        };

        $scope.sendRecoveryPasswordEmail=function(){
            $scope.submitted = true;

            if(!$scope.recoveryPasswordField.email){
                messageService.showErrorMessage("RECOVERY_PASSWORD_FIELDS_INCOMPLETE",true);
            }else{
                
                $http.post(API_CONFIG.url + API_CONFIG.password_reset, {
                        email: $scope.recoveryPasswordField.email
                })
                .then(function (reponse) {
                    messageService.showSuccessMessage("EMAIL_SENDED_TEXT","EMAIL_SENDED");
                    $scope.goBack();
                })
                .catch(function (errors) {
                    console.log("Errores retornado por el POST ", errors);
                    var error_message = '';
                    if (errors.data.email) {
                            error_message = errors.data.email[0];
                        }                    
                    showMessageDialog('Error', $translate.instant(error_message));
                    
                      
                });
                
            }
        }
        function showMessageDialog(title, message) {
                $mdDialog.show(
                    $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#alertPop')))
                        .clickOutsideToClose(true)
                        .title(title)
                        .content(message)
                        .ariaLabel('Alert Dialog Demo')
                        .ok('Aceptar')
                        .targetEvent('$event')
                );
            }
        $scope.goBack = function(){
            navigationService.cameToRecoveryPasswordThrough=="MunicipalityUserLogin" ? $location.path('/loginmunicipality') :  $location.path('/login');
        }
    });
