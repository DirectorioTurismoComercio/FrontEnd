'use strict';

angular.module('map')
    .service('MapRouteService', function ($window, CUNDINAMARCA_COORDS, $http, MapService, sitesNearRoute,
                                          SiteMarkerService) {

        function calulateRoute(origin, destination, $scope) {
            var routeData = {
                origin: {
                    lat: (typeof origin.lat ==="function")? origin.lat() : origin.lat,
                    lng: (typeof origin.lat ==="function")? origin.lng() : origin.lng
                },
                destination: {
                    lat: destination.lat(),
                    lng: destination.lng()
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

        return {
            calulateRoute: calulateRoute
        }
    });