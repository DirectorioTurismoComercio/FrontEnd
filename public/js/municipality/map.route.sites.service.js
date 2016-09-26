'use strict';

angular.module('Municipality')
    .service('MapRouteSitesService', function ($window, CUNDINAMARCA_COORDS, $http, MapService, sitesNearRoute,
                                          SiteMarkerService, messageService, siteAndTownSaverService, filterFilter) {

        function calculateRoute(sites, $scope, destinationSite) {
            var origin = new google.maps.LatLng(sites[0].latitud,sites[0].longitud);
            var destination = new google.maps.LatLng(sites[sites.length-1].latitud,sites[sites.length-1].longitud); 
            var waypoints=[];
            for(var i=1; i<sites.length-1;i++){
                waypoints.push({location: new google.maps.LatLng(sites[i].latitud,sites[i].longitud), stopover:true});
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
                    
                    var originIcon = MapService.createIcon('images/icons/salida-mapa.png', 50);
                    var destinationIcon = MapService.createIcon('images/icons/llegada-mapa.png', 50);
                    var siteIcon = MapService.createIcon('images/icons/pin-ubicacion-local.png', 50);

                    MapService.addMarker(origin, 'origin', originIcon,100);
                    if(sites.length>1){
                    MapService.addMarker(destination, 'destination', destinationIcon,100);
                    }

                    for(var i=0;i<waypoints.length;i++){
                        MapService.addMarker(waypoints[i].location, 'site', siteIcon);
                    }
                 
                }else{
                    console.log("error en el direction status");
                }
            });
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

        return {
            calculateRoute: calculateRoute,

        }
    });