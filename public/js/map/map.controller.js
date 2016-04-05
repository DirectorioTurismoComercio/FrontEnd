'use strict';

angular.module('map')
    .controller('MapController', function ($scope, $window, uiGmapGoogleMapApi, uiGmapIsReady, SearchForResultsFactory) {
        var MY_LOCATION = 'Mi Ubicación';
        var fromInput = document.getElementById('from');
        var toInput = document.getElementById('to');
        var directionsDisplay;
        var directionsService;
        var userPosition = {};

        $scope.routeFrom = '';
        $scope.routeTo = '';
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


        function drawSites() {
            var sites = SearchForResultsFactory.getResults();
            var map = $scope.map.control.getGMap();
            for(var i=0; i<sites.length;i++){
                var position={
                    lat: parseFloat(sites[i].latitud),
                    lng: parseFloat(sites[i].longitud)
                };
                addMarker(map,position);
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
            drawSites();
        }

        function addAutocompleteFeature(input) {
            var at;
            var rectangleCundinamarca = new google.maps.Rectangle({
                strokeColor: '#ff0000',
                strokeOpacity: 0.1,
                strokeWeight: 2,
                fillColor: '#ff0000',
                fillOpacity: 0.1,
                map: $scope.map.control.getGMap(),
                bounds: {
                    north: 5.829687,
                    south: 3.735986,
                    east: -73.048008,
                    west: -74.890964
                }
            });


            var options = {
                bounds: rectangleCundinamarca.getBounds(),
                componentRestrictions: {
                    country: "co"
                }
            };

            at = new google.maps.places.Autocomplete(input, options);
            at.addListener('place_changed', function () {
                var lat = at.getPlace().geometry.location.lat();
                var lng = at.getPlace().geometry.location.lng();

                var isInside = rectangleCundinamarca.getBounds().contains(new google.maps.LatLng(lat,lng));

                if(!isInside){
                    alert("El lugar seleccionado no esta disponible por el momento");
                    console.log(at.getPlace());
                    input.value = '';
                }
            });


            return at;
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

        $scope.clearRouteFrom = function () {
            $scope.routeFrom = '';
        }

        $scope.clearRouteTo = function () {
            $scope.routeTo = '';
        }
    });