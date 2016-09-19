'use strict';

angular.module('Municipality')
    .controller('municipalityRouteController',
        function ($scope, $http, API_CONFIG, uiGmapIsReady, MapService, uiGmapGoogleMapApi,
                  $rootScope, $location, municipalityInformationService, $timeout, $q, $window, $log, $translate, messageService, MapRouteSitesService) {
            $scope.map = {
                center: {
                    latitude: parseFloat(municipalityInformationService.getMunicipalityName().latitud),
                    longitude: parseFloat(municipalityInformationService.getMunicipalityName().longitud)
                },
                control: {},
                zoom: 13
            };

            $scope.routeName = undefined;
            $scope.routeDescription = undefined;
            $scope.routeSites = [];
            $scope.submitted = false;
            $scope.simulateQuery = false;
            $scope.isDisabled = false;
            $scope.routeDistance=undefined;
            $scope.routeDuration=undefined;

            var selectedSite = undefined;

            setPlaceholders();
            uiGmapIsReady.promise().then(initMap);
            getMunicipalitySites();


            $scope.selectedSite = function (selected) {
                if (selected) {
                    selectedSite = selected;
                }
            };

            $rootScope.$on('$translateChangeSuccess', function () {
                setPlaceholders();
            });


            $scope.isMobileDevice = function () {
                return $window.innerWidth < 992;
            };


            $scope.changeViewMunicipalityAccount = function () {
                $location.path('/municipalityaccountinfo');
            }

            $scope.cancelRegister = function () {
                $location.path('/municipalityaccountinfo');
            }


            $scope.addSite = function () {
                if (selectedSite) {
                    $scope.routeSites.push(selectedSite.originalObject);
                    $scope.$broadcast('angucomplete-alt:clearInput');
                    selectedSite = undefined;
                    drawRoute();
                }
            }

            $scope.removeSite = function (index) {
                $scope.routeSites.splice(index, 1);
                drawRoute();
            }

            $scope.saveRoute = function () {
                $scope.submitted = true;
                if ($scope.municipalityRouteBasicInfoForm.$valid && $scope.routeSites.length >= 2) {
                    sendToServer();
                }

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

            function initMap() {
                MapService.setGMap($scope.map.control.getGMap());
                drawRouteIfIsEditing();
            }

            function drawRouteIfIsEditing(){
                if (municipalityInformationService.getCurrentRoute()) {
                    var route = municipalityInformationService.getCurrentRoute();
                    $scope.routeName = route.nombre;
                    $scope.routeDescription = route.descripcion;
                    for (var i = 0; i < route.sitios.length; i++) {
                        $scope.routeSites.push(route.sitios[i].sitio);
                    }
                    drawRoute();
                }
            }

            function drawRoute() {
                MapService.clearMarkers();
                if ($scope.routeSites.length > 0) {
                    reloadMap();
                    MapRouteSitesService.calculateRoute($scope.routeSites, $scope, undefined);
                }
            }

            function getMunicipalitySites(){
                $http({
                    url: API_CONFIG.url + '/municipio/sitios',
                    method: "GET",
                    params: {'municipio_id': municipalityInformationService.getMunicipalityName().id},

                }).then(function (response) {
                        $scope.sites = response.data;
                    }
                    )
                    .catch(
                        function (errors) {
                            console.log("Errores retornado por el servidor", errors);
                            formValidator.emailAlreadyExistsShowError(errors);
                        }
                    );
            }

            function sendToServer() {
                var sites = [];
                for (var i = 0; i < $scope.routeSites.length; i++) {
                    sites.push({sitio_id: $scope.routeSites[i].id, orden: i + 1});
                }
                $http.post(
                    API_CONFIG.url + '/ruta/crear',
                    {
                        'nombre': $scope.routeName,
                        'descripcion': $scope.routeDescription,
                        'sitio': municipalityInformationService.getMunicipalitySite().id,
                        'sitios': sites
                    }
                ).then(function (response) {
                        $location.path('/municipalityaccountinfo');
                    }
                    )
                    .catch(
                        function (errors) {
                            console.log("Errores retornado por el servidor", errors);

                        }
                    )
            }

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
