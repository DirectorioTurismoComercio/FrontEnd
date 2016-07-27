'use strict';

angular.module('map')
    .service('MapService', function ($window, CUNDINAMARCA_COORDS) {
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
                directionsDisplay.setOptions({suppressMarkers: true});
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

        function addMarker(position, label, icon) {
            var marker = new MarkerWithLabel({
                position: position,
                map: gMap,
                labelContent: label,
                icon: icon,
                animation: google.maps.Animation.DROP,
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

        function addMarkerWithCategoryIcon(position, label, categorySite) {
            var normalIcon = getCategoryNormalIcon(categorySite);
            var lightedIcon = getCategoryLightedIcon(categorySite);
            var marker = addMarker(position, label, normalIcon);

            marker.normalIcon = normalIcon;
            marker.lightedIcon = lightedIcon;

            return marker;
        }

        function getCategoryNormalIcon(categorySite) {
            var iconSize=60;
            var url = categorySite.categoria.URL_icono_normal;
            return createIcon(url, iconSize);
        }

        function getCategoryLightedIcon(categorySite) {
            var iconSize=80;
            var url = categorySite.categoria.URL_icono_seleccionado;
            return createIcon(url, iconSize);
        }

        function createIcon(iconUrl, iconSize) {
            return {
                url: iconUrl,
                origin: new google.maps.Point(0, 0),
                scaledSize: new google.maps.Size(iconSize, iconSize)
            }
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
            setPinOnUserPosition: setPinOnUserPosition,
            addMarkerWithCategoryIcon: addMarkerWithCategoryIcon,
            createIcon: createIcon
        }
    });