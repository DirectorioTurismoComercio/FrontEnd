'use strict';

angular.module('Municipality')
    .service('MapRouteSitesService', function ($window, CUNDINAMARCA_COORDS, $http, MapService, sitesNearRoute,
                                          SiteMarkerService, messageService, siteAndTownSaverService, filterFilter) {

        function calculateRoute(sites, $scope, destinationSite) {
            var origin = new google.maps.LatLng(sites[0].latitud,sites[0].longitud);
            var destination = new google.maps.LatLng(sites[sites.length-1].latitud,sites[sites.length-1].longitud); 
            var waypoints=[];
            var waypointsIcons=[];
            for(var i=1; i<sites.length-1;i++){
                waypoints.push({location: new google.maps.LatLng(sites[i].latitud,sites[i].longitud), stopover:true});
                if(sites[i].tipo_sitio=='S'){
                    waypointsIcons.push((sites[i].categorias[0]));
                }else{
                    waypointsIcons.push(MapService.createIcon('images/icons/categories/pin-municipio.png', 50));
                }
            }


            var route = {
                travelMode: google.maps.TravelMode.DRIVING,
                origin: origin,
                waypoints: waypoints,
                destination: destination
            };

            MapService.clearMarkers();

            MapService.getDirectionsService().route(route, function (result, status) {
                setTextRouteproperties($scope,result);
                var points = [];
                if (status == google.maps.DirectionsStatus.OK) {
                    MapService.getDirectionsDisplay().setDirections(result);

                    var leg = result.routes[0].legs[0];
                    SiteMarkerService.deleteMarkers();
                    addMarkers(origin,waypoints,waypointsIcons,destination);
                 
                }else{
                    console.log("error en el direction status");
                }
            });
        }

        function addMarkers(origin,waypoints,waypointsIcons,destination){
            var originMarker=MapService.addOriginMarker(origin);
            SiteMarkerService.addSiteMarker(origin,originMarker,'');

            for(var i=0;i<waypoints.length;i++){
                var marker = MapService.addMarkerWithCategoryIcon(waypoints[i].location, '', waypointsIcons[i]);
                SiteMarkerService.addSiteMarker(waypoints[i].location, marker, '');
            }

            var destinationMarker=MapService.addDestinationMarker(destination);
            SiteMarkerService.addSiteMarker(destination,destinationMarker,'');
        }

        function setTextRouteproperties($scope,result){
            var distance = 0;
            var time = 0;
            for(var i=0;i<result.routes[0].legs.length;i++){
                distance = distance +  result.routes[0].legs[i].distance.value;
                time = time + result.routes[0].legs[i].duration.value;

            }
            distance = distance / 1000;
            time = time / 60;


            $scope.routeDistance=distance.toFixed(2)+" Km";
            $scope.routeDuration=time.toFixed(2)+" min";
        }

        function ensambleRouteSites(route){
            var routeSites=[];
            for (var i = 0; i < route.sitios.length; i++) {
                routeSites.push(route.sitios[i].sitio);
            }
            return routeSites;
        }


        return {
            calculateRoute: calculateRoute,
            ensambleRouteSites:ensambleRouteSites
        }
    });