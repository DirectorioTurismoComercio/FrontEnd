'use strict';
    angular.module('accountInfo')
        .controller('AccountInfoController', function ($scope, Constantes, $location, navBar, $mdToast,
                                                       authenticationService, registroService) {
                $scope.usuario = authenticationService.getUser();

                $scope.menu_bar = function (view) {
                    registroService.changeView(view)
                }
            });
