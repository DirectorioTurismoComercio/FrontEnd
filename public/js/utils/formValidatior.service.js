'use strict';

angular.module('utils')
    .service('formValidator', function ($mdDialog, $translate) {

        function isValidEmail(email){
            var emailDomain=email.split('@')[1];

            return emailDomain.indexOf('.')>-1

        }

        function emailAlreadyExistsShowError(errors){
            var error_message='E100';
            if (errors.data.email) {
                if(errors.data.email[0]==='E101'){
                    error_message='E101';
                }
            }

            $mdDialog.show(
                $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#alertPop')))
                    .clickOutsideToClose(true)
                    .title('Error')
                    .content($translate.instant(error_message))
                    .ariaLabel('Alert Dialog Demo')
                    .ok('Aceptar')
                    .targetEvent('$event')
            );
        }


        return {
            isValidEmail: isValidEmail,
            emailAlreadyExistsShowError:emailAlreadyExistsShowError
        }
    });