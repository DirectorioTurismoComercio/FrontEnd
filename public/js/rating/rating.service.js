'use strict';

angular.module('gemStore').service('RatingService', 
		function (authenticationService,$http,API_CONFIG) {
    function rateSite(siteId, rating) {
        
        $http.post(API_CONFIG.url + API_CONFIG.rate, {
                        sitio: siteId,
                        calificacion: rating
                    },
                    {
                       headers: {
                            'Authorization': 'Token ' + authenticationService.getUser().token
                        }
                    }).then(function (response) {
                        
                    
                },
                function (error){
                    console.log(error);
                }
                );
    }

    return {
        rateSite: rateSite
    };
});