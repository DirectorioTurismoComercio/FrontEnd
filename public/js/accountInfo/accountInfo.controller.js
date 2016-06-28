'use strict';
angular.module('accountInfo')
    .controller('AccountInfoController', function ($scope, Constantes, $location, navBar, $mdToast,
                                                   authenticationService, registroService, $window) {
        $scope.usuario = authenticationService.getUser();
        
        console.log("usuario", $scope.usuario);

        $scope.menu_bar = function (view) {
            registroService.changeView(view)
        }
    });
