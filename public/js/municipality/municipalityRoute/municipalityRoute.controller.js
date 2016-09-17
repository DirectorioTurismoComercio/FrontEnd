'use strict';

angular.module('Municipality')
    .controller('municipalityRouteController',
        function ($scope, $http, API_CONFIG, uiGmapIsReady, MapService, $window, $rootScope, $location, $timeout, municipalityInformationService, MunicipiosFactory, $q, $log, $translate, messageService) {
            $scope.map = {
                center: {
                    latitude: 4.6363623,//parseFloat(municipalityInformationService.getMunicipalityName().latitud),
                    longitude: -74.0854427//parseFloat(municipalityInformationService.getMunicipalityName().longitud)
                },
                control: {},
                zoom: 13
            };

            setPlaceholders();

            $scope.routeName = undefined;
            $scope.routeDescription = undefined;
            $scope.routeSites = [];
            $scope.submitted = false;

            $scope.simulateQuery = false;
            $scope.isDisabled = false;

            MunicipiosFactory.getTowns().then(function (response) {
                $scope.repos = response;
                console.log(response);
            }).catch(function (error) {
                messageService.showErrorMessage("GET_TOWNS_ERROR");
            });

            /*$http({
             url: API_CONFIG.url + '/municipio/sitios',
             method: "GET",
             params: {'municipio_id':60},

             }).then(function (response) {
             console.log(response);
             $scope.repos = response.data;
             }
             )
             .catch(
             function (errors) {
             console.log("Errores retornado por el servidor", errors);
             formValidator.emailAlreadyExistsShowError(errors);
             }
             );*/

            $scope.selectedCountry = function (selected) {
                if (selected) {
                    window.alert('You have selected ' + selected.title);
                } else {
                    console.log('cleared');
                }
            };

            $rootScope.$on('$translateChangeSuccess', function () {
                setPlaceholders();
            });


            $scope.isMobileDevice = function () {
                return $window.innerWidth < 992;
            };


            uiGmapIsReady.promise().then(initMap);

            function initMap() {
                MapService.setGMap($scope.map.control.getGMap());
            }


            $scope.changeViewMunicipalityAccount = function () {
                $location.path('/municipalityaccountinfo');
            }

            $scope.cancelRegister = function () {
                $location.path('/municipalityaccountinfo');
            }

            $scope.addSite = function () {
                var newRouteSite = $scope.routeSites.length + 1;
                $scope.routeSites.push({'id': 'site' + newRouteSite});
            }

            $scope.removeSite = function (index) {
                $scope.routeSites.splice(index, 1);
            }

            $scope.saveRoute = function () {
                $scope.submitted = true;
            }

            $scope.openNav = function () {
                document.getElementById("myNav").style.width = "100%";
                $("#createRouteMap .angular-google-map-container").height('80vh');
                $timeout(function () {
                    reloadMap();
                }, 500);
            };

            $scope.closeNav = function () {
                document.getElementById("myNav").style.width = "0%";
            };

            function setPlaceholders() {
                if ($translate.use() == 'en') {
                    $scope.startPointPlaceholder = $translate.instant("ROUTE_CREATION.ADD_ROUTE_POINT_ENGLISH");
                }
                if ($translate.use() == 'es') {
                    $scope.startPointPlaceholder = $translate.instant("ROUTE_CREATION.ADD_ROUTE_POINT");
                }
            }
            
            function reloadMap() {
                $timeout(function () {
                    google.maps.event.trigger($scope.map.control.getGMap(), 'resize');
                });
            }

        });
