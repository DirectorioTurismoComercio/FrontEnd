'use strict';

angular.module('gemStore').service('RatingService', function (authenticationService) {
    function rateSite(siteId, rating) {
        var user = authenticationService.getUser();
        console.log(user.id, siteId, rating);
    }

    return {
        rateSite: rateSite
    };
});