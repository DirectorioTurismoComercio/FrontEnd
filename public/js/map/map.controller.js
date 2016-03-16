'use strict';

angular.module('map')
    .controller('MapController', function ($scope, $window, uiGmapGoogleMapApi, uiGmapIsReady) {
        var fromInput = document.getElementById('from');
        var toInput = document.getElementById('to');
        var directionsDisplay;
        var directionsService;

        $scope.map = {
            center: {
                latitude: 4.5809775,
                longitude: -74.1340484
            },
            control: {},
            zoom: 9
        };


        uiGmapGoogleMapApi.then(initServices);
        uiGmapIsReady.promise().then(initMap);

        $scope.calculateRoute = function () {
            var request = {
                origin: fromInput.value,
                destination: toInput.value,
                travelMode: google.maps.TravelMode.DRIVING
            };

            directionsService.route(request, function (result, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(result);
                }
            });
        }

        $scope.goToUserPosition = function () {
            var geolocation = $window.navigator.geolocation;

            if (geolocation) {
                geolocation.getCurrentPosition(setUserPosition, handleLocationError);
            }
        }

        function initServices(GMapApi) {
            directionsDisplay = new GMapApi.DirectionsRenderer();
            directionsService = new GMapApi.DirectionsService();
        }

        function initMap() {
            addAutocompleteFeature(fromInput);
            addAutocompleteFeature(toInput);
            directionsDisplay.setMap($scope.map.control.getGMap());
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

        function handleLocationError() {
            alert("No es posible obtener la ubicación");
        }
    });