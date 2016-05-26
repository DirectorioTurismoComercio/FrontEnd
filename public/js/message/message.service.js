'use strict';

angular.module('message', [])
    .service('messageService', function ($mdDialog, $translate) {

        return {
            showErrorMessage: showErrorMessage
        }

        function showErrorMessage(messageId) {
            var message = $translate.instant(messageId);

            $mdDialog.show(
                $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#alertPop')))
                    .clickOutsideToClose(true)
                    .title('Error')
                    .content(message)
                    .ariaLabel('Alert Dialog Demo')
                    .ok('Aceptar')
                    .targetEvent('$event')
            );
        }

    });
