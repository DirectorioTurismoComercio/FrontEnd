'use strict';

angular.module('map')
    .service('MapRouteService', function ($window, CUNDINAMARCA_COORDS, $http, MapService, sitesNearRoute,
                                          SiteMarkerService, messageService, siteAndTownSaverService) {

        function calculateRoute(routeRequest, $scope, destinationSite) {

            var waypts=[];

            var punto=new google.maps.LatLng(4.732513230063399,-74.26302775740623);
            waypts.push({
                location:punto
            });

            var punto2= new google.maps.LatLng( 4.628837392723848, -74.4632613658905);
            waypts.push({
                location:punto2,
                stopover:true
            });

            var route = {
                travelMode: google.maps.TravelMode.DRIVING,
                origin: routeRequest.origin.location,
                destination: routeRequest.destination.location,
                waypoints: waypts,
                optimizeWaypoints:true
            };
            MapService.clearMarkers();
            MapService.getDirectionsService().route(route, function (result, status) {
                var points = [];
                if (status == google.maps.DirectionsStatus.OK) {
                    MapService.getDirectionsDisplay().setDirections(result);

                    var leg = result.routes[0].legs[0];
                    console.log("lo que devolvio", leg);
                    var originIcon = MapService.createIcon('images/icons/salida-mapa.png', 50);
                    var destinationIcon = MapService.createIcon('images/icons/llegada-mapa.png', 50);

                    MapService.addMarker(leg.start_location, 'origin', originIcon);
                    var destinationMarker = MapService.addMarker(leg.end_location, 'destination', destinationIcon, 1000);

                    addDestinationSiteMarker(destinationSite, destinationMarker, $scope);

                    for (var i = 0; i < result.routes[0].overview_path.length; i++) {
                        points.push([result.routes[0].overview_path[i].lat(), result.routes[0].overview_path[i].lng()]);
                    }

                    drawRouteSites(points, $scope);
                }
            });
        }

        function addDestinationSiteMarker(destinationSite, destinationMarker, $scope) {
            if (destinationSite != undefined) {
                SiteMarkerService.addSiteMarker(destinationSite, destinationMarker, $scope.showSiteDetail);
            }
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

                setSiteMarker(sites, $scope);

                $scope.loading = false;
                $scope.foundSites = sites;
                $scope.routeMapZoom = $scope.map.zoom;
                $scope.routeToSiteIsVisible = true;
                $scope.hasMadeCurrentSiteRoute = true;
            }).error(function (error) {
                console.log("Hubo un error", error);
            })
        }


        function setSiteMarker(sites,$scope){
            for (var i = 0; i < sites.length; i++) {
                var position = MapService.coordsToLatLngLiteral(parseFloat(sites[i].latitud), parseFloat(sites[i].longitud));


                var marker;

                if (sites[i].tipo_sitio != 'M') {
                    marker = MapService.addMarkerWithCategoryIcon(position, sites[i].nombre, sites[i].categorias[0]);
                } else {
                    marker = MapService.addMarkerMunicipalityWithIcon(position);
                }


                sites[i].categoryicon = marker.generalIcon.url;
                SiteMarkerService.addSiteMarker(sites[i], marker, $scope.showSiteDetail);
            }
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
            setOriginAndDestinationdata: setOriginAndDestinationdata,
            setSiteMarker:setSiteMarker
        }
    });