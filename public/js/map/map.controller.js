'use strict';

angular.module('map')
    .controller('MapController', function ($scope, $window, uiGmapGoogleMapApi, uiGmapIsReady) {
        var MY_LOCATION = 'Mi Ubicación';
        var fromInput = document.getElementById('from');
        var toInput = document.getElementById('to');
        var directionsDisplay;
        var directionsService;
        var userPosition = {};

        $scope.map = {
            center: {
                latitude: 4.6363623,
                longitude: -74.0854427
            },
            control: {},
            zoom: 9
        };


        uiGmapGoogleMapApi.then(initServices);
        uiGmapIsReady.promise().then(initMap);

        $scope.calculateRoute = function () {
            var routeData = {
                origin: fromInput.value,
                destination: toInput.value,
                travelMode: google.maps.TravelMode.DRIVING
            };

            if (fromInput.value == MY_LOCATION) {
                routeData.origin = userPosition.lat + "," + userPosition.lng;
            }

            directionsService.route(routeData, function (result, status) {
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
            var circleCundinamarca = new google.maps.Circle({
                //fillColor: '#FF0055',
                //fillOpacity: 0.35,
                //map: $scope.map.control.getGMap(),
                center: {
                    lat: $scope.map.center.latitude,
                    lng: $scope.map.center.longitude
                },
                radius: 137000
            });


            var options = {
                bounds: circleCundinamarca.getBounds(),
                componentRestrictions: {
                    country: "co"
                }
            };

            return new google.maps.places.Autocomplete(input, options);
        }

        function setUserPosition(position) {
            var map = $scope.map.control.getGMap();

            userPosition = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            fromInput.value = MY_LOCATION;

            addMarker(map, userPosition)
            map.setCenter(userPosition);
            map.setZoom(15);
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