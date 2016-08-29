'use strict';

angular.module('registerMunicipality')
    .controller('registerMunicipalityController', function ($scope, formValidator, $location, ngDialog) {
        $scope.municipalityData = {
            name: undefined,
            email: undefined,
            password: undefined
        };

        $scope.submitted = false;
        $scope.registerLoading = false;


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
            $scope.submitted = true;

            if ($scope.municipalityData.email != undefined && $scope.isValidEmail && $scope.municipalityData.password != undefined && $scope.municipalityData.password.length >= 6 && $scope.municipalityData.name != undefined) {
                $scope.registerLoading = true;
                //redirectToRegisterMunicipality();

                /*var registerPromise;
                var deferred = $q.defer();

                registerPromise = $http.post(API_CONFIG.url + API_CONFIG.user, {
                    email: $scope.municipalityData.email,
                    first_name: $scope.municipalityData.name,
                    password1: $scope.municipalityData.password,
                    password2: $scope.municipalityData.password,
                    last_name: $scope.municipalityData.name
                });

                registerPromise.then(function (response) {
                    authenticationService.setUserByToken(response.data.key, deferred).finally(
                        function() {
                            redirectToRegisterMunicipality()
                        }
                    );
                });

                registerPromise.catch(function(e){
                    $scope.registerLoading = false;
                    formValidator.emailAlreadyExistsShowError(e);
                });*/
            };
        }

        $scope.doneRegistration = function () {
            ngDialog.close();
            //$location.path('/businessinformation');
        }

        function redirectToRegisterMunicipality(){
            $scope.registerLoading=false;
            ngDialog.open({
                template: 'js/registerMunicipality/completeMunicipalityRegistration.html',
                width: 'auto',
                showClose: false,
                scope: $scope,
                closeByEscape: false,
                closeByDocument: false
            });
        }


    });
