'use strict';

angular.module('map')
    .service('MapRouteService', function ($window, CUNDINAMARCA_COORDS, $http, MapService, sitesNearRoute,
                                          SiteMarkerService, popErrorAlertService, siteAndTownSaverService) {

        function calulateRoute(origin, destination, $scope) {
            var routeData = {
                origin: {
                    lat: (typeof origin.lat === "function") ? origin.lat() : origin.lat,
                    lng: (typeof origin.lng === "function") ? origin.lng() : origin.lng
                },
                destination: {
                    lat: (typeof destination.lat === "function") ? destination.lat() : destination.lat,
                    lng: (typeof destination.lat === "function") ? destination.lng() : destination.lng
                },
                travelMode: google.maps.TravelMode.DRIVING
            };

            MapService.getDirectionsService().route(routeData, function (result, status) {
                var points = [];
                if (status == google.maps.DirectionsStatus.OK) {
                    MapService.getDirectionsDisplay().setDirections(result);

                    for (var i = 0; i < result.routes[0].overview_path.length; i++) {
                        points.push([result.routes[0].overview_path[i].lat(), result.routes[0].overview_path[i].lng()]);
                    }

                    drawRouteSites(points, $scope);
                }
            });
        }

        function setOriginAndDestinationdata(originData, destinationData) {
            if (originData == '' || destinationData == '') {
                popErrorAlertService.showPopErrorAlert("Indique un punto de partida y un destino");
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
                        var position = MapService.coordsToLatLng(parseFloat(sites[i].latitud), parseFloat(sites[i].longitud));
                        var marker = MapService.addMarker(position, sites[i].nombre);
                        SiteMarkerService.addSiteMarker(sites[i], marker, $scope.showSiteDetail);
                    }
                    $scope.loading = false;
                    $scope.foundSites = sites;
                })
                .error(function (error) {
                    console.log("Hubo un error", error);
                })
        }

        function transformPointName(point){
            if((point.formatted_address).indexOf(point.name)>-1){
                return point.formatted_address;
            }else{
                return point.name+", "+point.formatted_address;
            }
        }

        function setOriginData(originData){
            siteAndTownSaverService.setOrigin(originData.geometry.location);
            siteAndTownSaverService.setCurrentOriginPlaceName(transformPointName(originData));
        }

        function setDestinationData(destinationData){
            siteAndTownSaverService.setDestination(destinationData.geometry.location);
            siteAndTownSaverService.setCurrentDestinationPlaceName(transformPointName(destinationData));
        }

        return {
            calulateRoute: calulateRoute,
            setOriginAndDestinationdata: setOriginAndDestinationdata
        }
    });