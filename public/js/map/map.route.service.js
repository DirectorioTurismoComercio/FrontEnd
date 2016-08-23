'use strict';

angular.module('map')
    .service('MapRouteService', function ($window, CUNDINAMARCA_COORDS, $http, MapService, sitesNearRoute,
                                          SiteMarkerService, messageService, siteAndTownSaverService) {

        function calculateRoute(routeRequest, $scope) {
            var route = {
                travelMode: google.maps.TravelMode.DRIVING,
                origin: routeRequest.origin.location,
                destination: routeRequest.destination.location
            };
            MapService.clearMarkers();
            MapService.getDirectionsService().route(route, function (result, status) {
                var points = [];
                if (status == google.maps.DirectionsStatus.OK) {
                    MapService.getDirectionsDisplay().setDirections(result);

                    var leg = result.routes[0].legs[0];
                    var originIcon = MapService.createIcon('images/icons/salida-mapa.png', 50);
                    var destinationIcon = MapService.createIcon('images/icons/llegada-mapa.png', 50);
                    MapService.addMarker(leg.start_location, 'origin', originIcon);
                    MapService.addMarker(leg.end_location, 'destination', destinationIcon);

                    for (var i = 0; i < result.routes[0].overview_path.length; i++) {
                        points.push([result.routes[0].overview_path[i].lat(), result.routes[0].overview_path[i].lng()]);
                    }

                    drawRouteSites(points, $scope);
                }
            });
        }

        function setOriginAndDestinationdata(originData, destinationData) {
            if (originData == '' || destinationData == '') {
                messageService.showErrorMessage("Indique un punto de partida y un destino");
                return false;
            } else {
                if (originData != "Mi posición actual") {
                    setOriginData(originData);
                }
                setDestinationData(destinationData);
                return true;
            }
        }

        function drawRouteSites(points, $scope) {
            sitesNearRoute.getSitesNearRoute(points).success(function (sites) {

                for (var i = 0; i < sites.length; i++) {
                    var position = MapService.coordsToLatLngLiteral(parseFloat(sites[i].latitud), parseFloat(sites[i].longitud));
                    var marker = MapService.addMarkerWithCategoryIcon(position, sites[i].nombre, sites[i].categorias[0]);
                    sites[i].categoryicon=marker.normalIcon.url;
                    SiteMarkerService.addSiteMarker(sites[i], marker, $scope.showSiteDetail);
                }

                $scope.loading = false;
                $scope.foundSites = sites;
                $scope.routeMapZoom = $scope.map.zoom;
                $scope.routeToSiteIsVisible=true;
                $scope.hasMadeCurrentSiteRoute=true;
            }).error(function (error) {
                console.log("Hubo un error", error);
            })
        }

        function transformPointName(point) {
            if ((point.formatted_address).indexOf(point.name) > -1) {
                return point.formatted_address;
            } else {
                return point.name + ", " + point.formatted_address;
            }
        }

        function setOriginData(originData) {
            siteAndTownSaverService.setOrigin(originData.geometry.location);
            siteAndTownSaverService.setCurrentOriginPlaceName(transformPointName(originData));
        }

        function setDestinationData(destinationData) {
            siteAndTownSaverService.setDestination(destinationData.geometry.location);
            siteAndTownSaverService.setCurrentDestinationPlaceName(transformPointName(destinationData));
        }

        return {
            calculateRoute: calculateRoute,
            setOriginAndDestinationdata: setOriginAndDestinationdata
        }
    });