'use strict';
angular.module('forgotPassword')
    .controller('resetPasswordController', function ($scope, messageService, $translate,
        navigationService, $location,$http, API_CONFIG,$routeParams,formValidator,$mdDialog) {
    	$scope.changePasswordSubmitted = false;
    	$scope.usuario= {};

    	    $scope.saveNewPassword = function () {
                $scope.changePasswordSubmitted = true;
                
                if ($scope.passwordForm.$valid 
                	&& $scope.usuario.newpassword == $scope.usuario.confirmnewpassword
                    && $scope.usuario.newpassword.length >= 6) {
                	console.log("saving");
                	
                	
                    $http.post(API_CONFIG.url + API_CONFIG.confirm_password_reset,
                        
                           {"new_password1": $scope.usuario.newpassword,
                            "new_password2": $scope.usuario.newpassword, 
                            "uid": $routeParams.uid, 
                            "token": $routeParams.token
                           }
                        
                        )

                        .then(function (response) {
                                showMessageDialog('', $translate.instant('ACCOUNT_INFO.ACCOUNT_PASSWORD_SUCCESSFULLY_UPDATED'));
                                $location.path('/home');
                            }
                        )
                        .catch(
                            function (errors) {
                                showMessageDialog('Error', $translate.instant('RESET_PASSWORD.ERROR_MESSAGE'));
                                console.log(errors);
                                $location.path('/home');
                            }
                        );

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
    }
 );
