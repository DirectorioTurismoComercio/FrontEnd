'use strict';

angular.module('message', [])
    .service('messageService', function ($mdDialog, $translate) {

        return {
            showErrorMessage: showErrorMessage,
            showSuccessMessage: showSuccessMessage,
            confirmMessage: confirmMessage
        }

        function showErrorMessage(messageId,parent) {
            var message = $translate.instant(messageId);
            if(parent!==true ){
                messageWindow(message,'Error', document.querySelector('#alertPop'));
            }else{
                messageWindow(message,'Error',document.body);
            }
        }

        function showSuccessMessage(messageId,messageTitleId) {
            var message = $translate.instant(messageId);
            var messageTitle= $translate.instant(messageTitleId);
            messageWindow(message,messageTitle);
        }

        function messageWindow(message,title, parentElement){
            $mdDialog.show(
                $mdDialog.alert()
                    .parent(angular.element(parentElement))
                    .clickOutsideToClose(true)
                    .title(title)
                    .content(message)
                    .ariaLabel('Alert Dialog Demo')
                    .ok('Aceptar')
                    .targetEvent('$event')
            );
        }
        function confirmMessage(message,title, okFunction,okArg, cancelFunction, cancelArg){
            $mdDialog.show(
                $mdDialog.confirm()
                    .parent(angular.element(document.querySelector('#alertPop')))
                    .clickOutsideToClose(true)
                    .title(title)
                    .content(message)
                    .ariaLabel('Alert Dialog Demo')
                    .ok($translate.instant('ACCEPT_BUTTON'))
                    .cancel($translate.instant('CANCEL_BUTTON'))
                    .targetEvent('$event')
            ).then(
            function (){
                try{
                     okFunction(okArg);
                }catch(err){}
            }
            ,function(){
                try{
                cancelFunction(cancelArg);
                }catch(err){}
            });
        }
    });
