'use strict';
angular.module('accountInfo')
    .controller('AccountInfoController', function ($scope, $location,
                                                   authenticationService, navigationService) {

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
            navigationService.cameToBusinessInformationThrough='accountinfo';
            $location.path('businessinformation');
        }

        $scope.$on('$routeChangeStart', function (scope, next, current) {
            if(next.$$route.controller=='summaryController') {
                $location.path('/accountinfo');
            }
        });
    });
