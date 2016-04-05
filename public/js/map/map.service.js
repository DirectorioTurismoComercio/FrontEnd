'use strict';

angular.module('map')
    .service('MapService', function ($window) {
        var boundsCundinamarca = {
            north: 5.829687,
            south: 3.735986,
            east: -73.048008,
            west: -74.890964
        };

        function calulateRoute(origin, destination, directionsService, directionsDisplay) {
            var routeData = {
                origin: origin,
                destination: destination,
                travelMode: google.maps.TravelMode.DRIVING
            };

            directionsService.route(routeData, function (result, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(result);
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
            var rectangleCundinamarca = new google.maps.Rectangle({
                bounds: boundsCundinamarca
            });
            var options = {
                bounds: rectangleCundinamarca.getBounds(),
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
            var rectangleCundinamarca = new google.maps.Rectangle({
                bounds: boundsCundinamarca
            });
            var coords = new google.maps.LatLng(latitude, longitude);
            var isPlaceInCundinamarca = rectangleCundinamarca.getBounds()
                .contains(coords);

            return isPlaceInCundinamarca;
        }

        function addMarker(map, position) {
            return new google.maps.Marker({
                position: position,
                map: map
            });
        }


        function coordsToLatLng(latitude, longitude) {
            return {
                lat: latitude,
                lng: longitude
            }
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