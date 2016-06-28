'use strict';
angular.module('accountInfo')
    .controller('AccountInfoController', function ($scope, $location,
                                                   authenticationService) {
        $scope.usuario = authenticationService.getUser();
        
        console.log("usuario", $scope.usuario);

        $scope.addBusiness=function(){
            $location.path('businessinformation');
        }
    });
