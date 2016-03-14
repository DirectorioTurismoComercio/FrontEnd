'use strict';

angular.module('map')
    .controller('MapController', function ($scope, $timeout, uiGmapGoogleMapApi, uiGmapIsReady) {
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

        uiGmapIsReady.promise().then(createPlacesService);

        function createPlacesService() {
            var mapObject = $scope.map.control.getGMap();
            var placesService = new google.maps.places.PlacesService(mapObject);

            var options = {
                types: ['(cities)'],
                componentRestrictions: {country: "co"}
            };

            var input = document.getElementById('from');
            var autocomplete = new google.maps.places.Autocomplete(input, options);

        }
    });