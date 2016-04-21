'use strict';

angular.module('map')
    .service('MapService', function ($window, CUNDINAMARCA_COORDS, $http, API_CONFIG, SiteMarkerService) {

        function calulateRoute(origin, destination, directionsService, directionsDisplay, map) {
            var routeData = {
                origin: origin,
                destination: destination,
                travelMode: google.maps.TravelMode.DRIVING
            };

            directionsService.route(routeData, function (result, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(result);

                    var points = [];

                    for (var i = 0; i < result.routes[0].overview_path.length; i++) {
                        points.push([result.routes[0].overview_path[i].lat(), result.routes[0].overview_path[i].lng()]);
                    }

                    $http.post(API_CONFIG.url + API_CONFIG.sitios, {'points': points}, {})
                        .success(function (sites) {
                            console.log(sites);
                            for (var i = 0; i < sites.length; i++) {
                                var position = coordsToLatLng(parseFloat(sites[i].latitud), parseFloat(sites[i].longitud));
                                var marker = addMarker(map, position, sites[i].nombre);

                                SiteMarkerService.createSiteMarker(sites[i], marker, map);
                            }
                        })
                        .error(function (error) {
                            console.log("Hubo un error", error);
                        })
                }
            });
        }

        function getUserPosition(userPositionResolved, errorGettingLocation) {
            var geolocation = $window.navigator.geolocation;

            if (geolocation) {
                geolocation.getCurrentPosition(userPositionResolved, errorGettingLocation);
            }
        }

        function addAutocompleteFeature(inputBox) {
            var options = {
                bounds: calculatePolygonBounds(),
                componentRestrictions: {
                    country: "co"
                }
            };

            return new google.maps.places.Autocomplete(inputBox, options);
        }

        function addPlaceChangedListener(autocomplete, inputBox, callback) {
            autocomplete.addListener('place_changed', function () {
                callback(autocomplete, inputBox);
            });
        }

        function isPlaceInCundinamarca(latitude, longitude) {
            var coords = new google.maps.LatLng(latitude, longitude);
            var cundinamarcaPolygon = new google.maps.Polygon({paths: CUNDINAMARCA_COORDS});

            return google.maps.geometry.poly.containsLocation(coords, cundinamarcaPolygon);
        }

        function addMarker(map, position, label) {
            return new MarkerWithLabel({
                position: position,
                map: map,
                labelContent: label,
                labelAnchor: new google.maps.Point(22, 0),
                labelClass: "marker-label",
                labelStyle: {
                    "font-weight": "bold",
                    opacity: 1.0
                }
            });
        }

        function coordsToLatLng(latitude, longitude) {
            return {
                lat: latitude,
                lng: longitude
            }
        }

        function calculatePolygonBounds() {
            var bounds = new google.maps.LatLngBounds();
            var cundinamarcaPolygon = new google.maps.Polygon({paths: CUNDINAMARCA_COORDS});
            var path = cundinamarcaPolygon.getPath();

            path.forEach(function (latlng, i) {
                bounds.extend(latlng);
            });

            return bounds;
        }

        return {
            calulateRoute: calulateRoute,
            getUserPosition: getUserPosition,
            addAutocompleteFeature: addAutocompleteFeature,
            addPlaceChangedListener: addPlaceChangedListener,
            isPlaceInCundinamarca: isPlaceInCundinamarca,
            addMarker: addMarker,
            coordsToLatLng: coordsToLatLng
        }
    })
;