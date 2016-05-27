'use strict';

angular.module('message', [])
    .service('messageService', function ($mdDialog, $translate) {

        return {
            showErrorMessage: showErrorMessage,
            showSuccessMessage: showSuccessMessage
        }

        function showErrorMessage(messageId) {
            var message = $translate.instant(messageId);
            messageWindow(message,'Error');
        }

        function showSuccessMessage(messageId,messageTitleId) {
            var message = $translate.instant(messageId);
            var messageTitle= $translate.instant(messageTitleId);
            messageWindow(message,messageTitle);
        }

        function messageWindow(message,title){
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
    });
