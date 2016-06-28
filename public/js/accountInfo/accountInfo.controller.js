'use strict';
angular.module('accountInfo')
    .controller('AccountInfoController', function ($scope, $location,
                                                   authenticationService) {

        $scope.showRequiredFieldMessage = false;
        $scope.usuario = authenticationService.getUser();

        authenticationService.getUserData($scope.usuario.token)
            .success(function (response) {
                $scope.usuario = response;
            });

        $scope.save = function () {
            if ($scope.traderInfoForm.$valid) {

            } else {
                $scope.showRequiredFieldMessage = true;
            }
        }

        $scope.addBusiness = function () {
            $location.path('businessinformation');
        }
    });
