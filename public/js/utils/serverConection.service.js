'use strict';

angular.module('utils')
    .service('serverConnectionService', function (messageService) {

        function checkTimeOutError(e){
            if(e.status===0 && e.statusText==""){
                messageService.showErrorMessage("TIMEOUT_CONNECTION_ERROR",true);
            }
        }

        return {
            checkTimeOutError: checkTimeOutError
        }
    });