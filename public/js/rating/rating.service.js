'use strict';

angular.module('gemStore').service('RatingService',
    function (authenticationService, $http, API_CONFIG) {
        function sendRate(siteId, rating, user) {
            $http.post(API_CONFIG.url + API_CONFIG.rate, {
                    sitio: siteId,
                    calificacion: rating
                },
                {
                    headers: {
                        'Authorization': 'Token ' + user.token
                    }
                }).then(function (response) {


                },
                function (error) {
                    console.log(error);
                }
            );
        }

        function rateSite(siteId, rating) {
            var user = authenticationService.getUser();

            if (user) {
                sendRate(siteId, rating, user);
            } else {
                alert("Primero debe iniciar sesión para calificar un sitio");
            }
        }

        return {
            rateSite: rateSite
        };
    });