'use strict';

angular.module('popErrorAlert', [])
    .service('popErrorAlertService', function ($mdDialog) {

        return {
            showPopErrorAlert: showPopErrorAlert,
        }

        function showPopErrorAlert(message) {
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
