'use strict';

angular.module('utils')
    .service('serverConnectionService', function (messageService) {

        return {
            checkTimeOutError: checkTimeOutError,
            communicationError:communicationError
        }

        function checkTimeOutError(e){
            if(e.status===0 && e.statusText==""){
                messageService.showErrorMessage("TIMEOUT_CONNECTION_ERROR",true);
            }
        }

        function communicationError(error){
            messageService.showErrorMessage("ERROR_SERVER_COMMUNICATION", true);
            console.log("hubo un error al borrar", error);
        }

    });