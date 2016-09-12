'use strict';

angular.module('Municipality')
    .controller('registerMunicipalityAccountController', function ($scope, formValidator, $location, ngDialog, authenticationService, $q, $http, API_CONFIG, messageService) {
        $scope.municipalityData = {
            name: undefined,
            email: undefined,
            password: undefined
        };

        $scope.submitted = false;

        var alreadyLoggedIn = authenticationService.getUser();

        $scope.$watch('municipalityData.email', function () {
            try {
                $scope.isValidEmail = formValidator.isValidEmail($scope.municipalityData.email);
            } catch (e) {
            }
        });

        $scope.goHome = function () {
            $location.path('home');
        };

        $scope.save = function () {
            $scope.submitted = true

            if(alreadyLoggedIn){
                messageService.showErrorMessage("DOUBLE_REGISTER_ERROR");
            }else{
                if ($scope.municipalityData.email != undefined && $scope.isValidEmail && $scope.municipalityData.password != undefined && $scope.municipalityData.password.length >= 6 && $scope.municipalityData.name != undefined) {

                    var registerPromise;
                    var deferred = $q.defer();

                    registerPromise = $http.post(API_CONFIG.url + API_CONFIG.user, {
                        email: $scope.municipalityData.email,
                        first_name: $scope.municipalityData.name,
                        password1: $scope.municipalityData.password,
                        password2: $scope.municipalityData.password,
                        last_name: $scope.municipalityData.name,
                        tipo_cuenta:'M'
                    });

                    registerPromise.then(function (response) {
                        authenticationService.setUserByToken(response.data.key, deferred).finally(
                            function() {
                                redirectToRegisterMunicipality()
                            }
                        );
                    });

                    registerPromise.catch(function(e){
                        formValidator.emailAlreadyExistsShowError(e);
                    });
                };            }


        }

        $scope.doneRegistration = function () {
            ngDialog.close();
            $location.path('/municipalityinfo');
        }

        function redirectToRegisterMunicipality(){
            ngDialog.open({
                template: 'js/municipality/registerMunicipalityAccount/completeMunicipalityRegistration.html',
                width: 'auto',
                showClose: false,
                scope: $scope,
                closeByEscape: false,
                closeByDocument: false
            });
        }


    });
