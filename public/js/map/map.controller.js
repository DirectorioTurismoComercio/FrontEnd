'use strict';

angular.module('map')
    .controller('MapController', function ($scope, $window, uiGmapGoogleMapApi, uiGmapIsReady) {
        $scope.map = {
            center: {
                latitude: 4.5809775,
                longitude: -74.1340484
            },
            control: {},
            zoom: 9
        };

        uiGmapGoogleMapApi.then(function (GMapsApi) {
            //var placesService = new google.maps.places.PlacesService(GMapsApi.Map);
            //console.log(placesService);

            /*
             var directionsRequest = {
             origin: LatLng | String | google.maps.Place,
             destination: LatLng | String | google.maps.Place,
             }*/


            //map.DirectionsService.route()
        });

        uiGmapIsReady.promise().then(initMap);

        function initMap() {
            var map = $scope.map.control.getGMap();
            var placesService = new google.maps.places.PlacesService(map);


            var fromInput = document.getElementById('from');
            var toInput = document.getElementById('to');

            addAutocompleteFeature(fromInput);
            addAutocompleteFeature(toInput);
        }

        function addAutocompleteFeature(input) {
            var options = {
                types: ['(cities)'],
                componentRestrictions: {
                    country: "co"
                }
            };

            return new google.maps.places.Autocomplete(input, options);
        }

        $scope.getUserPosition = function () {
            var geolocation = $window.navigator.geolocation;

            if (geolocation) {
                geolocation.getCurrentPosition(setUserPosition, handleLocationError);
            }
        }

        function setUserPosition(position) {
            var map = $scope.map.control.getGMap();
            var gMapPosition = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            map.setCenter(gMapPosition);
            map.setZoom(15);
            addMarker(map, gMapPosition)
        }

        function addMarker(map, position) {
            return new google.maps.Marker({
                position: position,
                map: map
            });
        }

        function handleLocationError(browserHasGeolocation, infoWindow, pos) {
            infoWindow.setPosition(pos);
            infoWindow.setContent(browserHasGeolocation ?
                'Error: The Geolocation service failed.' :
                'Error: Your browser doesn\'t support geolocation.');
        }
    });