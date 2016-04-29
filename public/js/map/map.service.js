'use strict';

angular.module('map')
    .service('MapService', function ($window, CUNDINAMARCA_COORDS, $http, API_CONFIG, SiteMarkerService, sitesNearRoute) {
        var directionsDisplay;
        var directionsService;
        var gMap;

        function setDirectionsDisplay(_directionsDisplay) {
            directionsDisplay = _directionsDisplay;
        }

        function setDirectionsService(_directionsService) {
            directionsService = _directionsService;
        }

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

        function calulateRoute(origin, destination, $scope) {
            var routeData = {
                origin: origin,
                destination: destination,
                travelMode: google.maps.TravelMode.DRIVING
            };

            getDirectionsService().route(routeData, function (result, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setOptions({suppressMarkers: true});
                    directionsDisplay.setDirections(result);

                    var points = [];
                    for (var i = 0; i < result.routes[0].overview_path.length; i++) {
                        points.push([result.routes[0].overview_path[i].lat(), result.routes[0].overview_path[i].lng()]);
                    }
                    drawRouteSites(points, gMap, $scope);
                }
            });
        }

        function drawRouteSites(points, $scope) {
            sitesNearRoute.getSitesNearRoute(points).success(function (sites) {

                    for (var i = 0; i < sites.length; i++) {
                        var position = coordsToLatLng(parseFloat(sites[i].latitud), parseFloat(sites[i].longitud));
                        var marker = addMarker(gMap, position, sites[i].nombre);
                        SiteMarkerService.addSiteMarker(sites[i], marker, gMap, $scope.showSiteDetail);
                    }
                    $scope.loading = false;
                    $scope.foundSites = sites;
                })
                .error(function (error) {
                    console.log("Hubo un error", error);
                })
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

        function isPlaceInCundinamarca(latitude, longitude) {
            var coords = new google.maps.LatLng(latitude, longitude);
            var cundinamarcaPolygon = new google.maps.Polygon({paths: CUNDINAMARCA_COORDS});

            return google.maps.geometry.poly.containsLocation(coords, cundinamarcaPolygon);
        }

        function addMarker(position, label) {
            return new MarkerWithLabel({
                position: position,
                map: gMap,
                labelContent: label,
                labelAnchor: new google.maps.Point(22, 0),
                labelClass: "marker-label",
                labelStyle: {
                    "font-weight": "bold",
                    opacity: 1.0
                }
            });
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

        return {
            setDirectionsService: setDirectionsService,
            setDirectionsDisplay: setDirectionsDisplay,
            setGMap: setGMap,
            getDirectionsService: getDirectionsService,
            getDirectionsDisplay: getDirectionsDisplay,
            getGMap: getGMap,
            calulateRoute: calulateRoute,
            getUserPosition: getUserPosition,
            addAutocompleteFeature: addAutocompleteFeature,
            addPlaceChangedListener: addPlaceChangedListener,
            isPlaceInCundinamarca: isPlaceInCundinamarca,
            addMarker: addMarker,
            coordsToLatLng: coordsToLatLng
        }
    });