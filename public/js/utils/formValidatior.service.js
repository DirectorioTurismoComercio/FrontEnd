'use strict';

angular.module('utils')
    .service('formValidator', function () {

        function isValidEmail(email){
            var emailDomain=email.split('@')[1];

            return emailDomain.indexOf('.')>-1

        }

        return {
            isValidEmail: isValidEmail
        }
    });