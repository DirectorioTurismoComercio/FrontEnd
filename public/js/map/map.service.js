'use strict';

angular.module('map')
    .service('MapService', function ($window, CUNDINAMARCA_COORDS, $http, API_CONFIG, SiteMarkerService, sitesNearRoute) {
        var directionsDisplay;
        var directionsService;
        var gMap;
        var markers = [];


        function setGMap(_gMap) {
            gMap = _gMap;
            getDirectionsDisplay().setMap(_gMap);
        }

        function getDirectionsDisplay() {
            if (directionsDisplay == undefined) {
                directionsDisplay = new google.maps.DirectionsRenderer();
            }

            return directionsDisplay;
        }

        function getDirectionsService() {
            if (directionsService == undefined) {
                directionsService = new google.maps.DirectionsService();
            }

            return directionsService;
        }

        function getGMap() {
            return gMap;
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

        function isPlaceInsideBoundaries(latitude, longitude, region) {
            var coords = new google.maps.LatLng(latitude, longitude);
            var regionPolygon = new google.maps.Polygon({paths: region});

            return google.maps.geometry.poly.containsLocation(coords, regionPolygon);
        }

        function addMarker(position, label) {
            var marker = new MarkerWithLabel({
                position: position,
                map: gMap,
                labelContent: label,
                labelAnchor: new google.maps.Point(22, 20),
                labelClass: "marker-label",
                labelStyle: {
                    "font-weight": "bold",
                    opacity: 1
                }
            });

            markers.push(marker);

            return marker;
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

        function moveMapToPosition(position) {
            gMap.setCenter(position);
            gMap.setZoom(15);
        }

        function clearMarkers() {
            markers.forEach(function (marker) {
                marker.setMap(undefined);
            });
        }

        return {
            setGMap: setGMap,
            getDirectionsService: getDirectionsService,
            getDirectionsDisplay: getDirectionsDisplay,
            getGMap: getGMap,
            getUserPosition: getUserPosition,
            addAutocompleteFeature: addAutocompleteFeature,
            addPlaceChangedListener: addPlaceChangedListener,
            isPlaceInsideBoundaries: isPlaceInsideBoundaries,
            addMarker: addMarker,
            coordsToLatLng: coordsToLatLng,
            moveMapToPosition: moveMapToPosition,
            clearMarkers: clearMarkers
        }
    });