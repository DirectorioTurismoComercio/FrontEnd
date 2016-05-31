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

        function addAutocompleteFeature(inputBox, placeChangedCallback) {
            var options = {
                bounds: calculatePolygonBounds(),
                componentRestrictions: {
                    country: "co"
                }
            };
            var autocomplete = new google.maps.places.Autocomplete(inputBox, options);

            if (placeChangedCallback != undefined) {
                autocomplete.addListener('place_changed', function () {
                    placeChangedCallback(autocomplete, inputBox);
                });
            }

            return autocomplete;
        }


        function isPlaceInsideRegion(latLngLiteralPlaceLocation, regionCoords) {
            var placeLocation = latLngLiteralToLatLng(latLngLiteralPlaceLocation);
            var regionPolygon = new google.maps.Polygon({paths: regionCoords});

            return google.maps.geometry.poly.containsLocation(placeLocation, regionPolygon);
        }

        function isPlaceInsideCundinamarca(latLngLiteralPlaceLocation) {
            return isPlaceInsideRegion(latLngLiteralPlaceLocation, CUNDINAMARCA_COORDS);
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


        function coordsToLatLngLiteral(latitude, longitude) {
            return {
                lat: latitude,
                lng: longitude
            }
        }

        function geolocationToLatLngLiteral(geolocation) {
            return {
                lat: geolocation.latitude,
                lng: geolocation.longitude
            }
        }

        function latLngLiteralToLatLng(latLngLiteral) {
            return new google.maps.LatLng(latLngLiteral.lat, latLngLiteral.lng);
        }

        function placeToLatLngLiteral(place) {
            try {
                return place.geometry.location.toJSON();
            } catch (err) {
                return undefined;
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

        function moveMapToPosition(position, zoom) {
            gMap.setCenter(position);
            gMap.setZoom(zoom);
        }

        function clearMarkers() {
            markers.forEach(function (marker) {
                marker.setMap(undefined);
            });
        }

        function clearRoute() {
            getDirectionsDisplay().setDirections({
                routes: []
            });
        }

        function setPinOnUserPosition(userPosition) {
            try {
                moveMapToPosition(userPosition, 12);
                addMarker(userPosition);
            } catch (error) {
            }
        }

        return {
            setGMap: setGMap,
            getDirectionsService: getDirectionsService,
            getDirectionsDisplay: getDirectionsDisplay,
            getGMap: getGMap,
            getUserPosition: getUserPosition,
            addAutocompleteFeature: addAutocompleteFeature,
            isPlaceInsideRegion: isPlaceInsideRegion,
            isPlaceInsideCundinamarca: isPlaceInsideCundinamarca,
            addMarker: addMarker,
            coordsToLatLngLiteral: coordsToLatLngLiteral,
            latLngLiteralToLatLng: latLngLiteralToLatLng,
            placeToLatLngLiteral: placeToLatLngLiteral,
            geolocationToLatLngLiteral: geolocationToLatLngLiteral,
            moveMapToPosition: moveMapToPosition,
            clearMarkers: clearMarkers,
            clearRoute: clearRoute,
            setPinOnUserPosition: setPinOnUserPosition
        }
    });