'use strict';

angular.module('Municipality')
    .controller('loginMunicipalityController', function ($scope, authenticationService, messageService, $translate, $location) {
        $scope.loginLoading = false;
        $scope.submitted = false;

        $scope.loginMunicipalityFields = {
            email: undefined,
            password: undefined
        };

        $scope.loginMunicipality = function () {
            $scope.submitted = true;
            if ($scope.loginMunicipalityFields.email != undefined && $scope.loginMunicipalityFields.password != undefined && $scope.loginMunicipalityFields.password.length >= 6) {
                $scope.loginLoading = true;
                authenticationService.login({
                        email: $scope.loginMunicipalityFields.email,
                        password: $scope.loginMunicipalityFields.password
                    })
                    .then(function () {
                        redirectToProfileMain();
                        console.log("se ha logueado correctamente");
                    }).catch(function (error) {
                    messageService.showErrorMessage("BAD_LOGIN",true);
                    $scope.loginLoading = false;
                });
            }
            else {
                messageService.showErrorMessage("LOGIN_FIELDS_INCOMPLETE",true);
            }
        }

        function redirectToProfileMain() {
            $scope.loginLoading = false;
            $location.path('/accountinfo');
        }

    });
