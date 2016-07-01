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

        function addMarkerWithCategoryIcon(position, label, categoryId) {
            var normalIcon = getCategoryNormalIcon(categoryId);
            var lightedIcon = getCategoryLightedIcon(categoryId);
            var marker = addMarker(position, label, normalIcon);

            marker.normalIcon = normalIcon;
            marker.lightedIcon = lightedIcon;

            return marker;
        }

        function getCategoryNormalIcon(categoryId) {
            var iconFolder = 'images/icons/categories/';
            if ($window.innerWidth < 992) {
                return getCategoryIcon(iconFolder, categoryId, 40);
            } else {
                return getCategoryIcon(iconFolder, categoryId, 60);
            }
        }

        function getCategoryLightedIcon(categoryId) {
            var iconFolder = 'images/icons/categories/lighted/';
            if ($window.innerWidth < 992) {
                return getCategoryIcon(iconFolder, categoryId, 60);
            } else {
                return getCategoryIcon(iconFolder, categoryId, 80);
            }
        }
        
        function getCategoryIcon(iconFolder, categoryId, iconSize) {
            var url = iconFolder;

            switch (categoryId) {
                case 1:
                    url += 'naturaleza-agroturismo.png';
                    break;
                case 2:
                    url += 'deporte.png';
                    break;
                case 3:
                    url += 'costumbres-creencias.png';
                    break;
                case 4:
                    url += 'arte-cultura.png';
                    break;
                case 5:
                    url += 'comida-bebida.png';
                    break;
                case 6:
                    url += 'entretenimiento.png';
                    break;
                case 7:
                    url += 'comercio.png';
                    break;
                case 8:
                    url += 'transporte.png';
                    break;
                case 9:
                    url += 'hospedaje-salud.png';
                    break;
                default:
                    url = "images/icons/pin-ubicacion-local.png";
            }
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