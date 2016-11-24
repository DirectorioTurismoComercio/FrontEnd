'use strict';

angular.module('vote')
    .controller('VoteController', function ($scope, SearchForResultsFactory, selectedSite,ngDialog, RatingService, $rootScope) {
              

        $scope.site = {"rating":0};

        $scope.send = function(){
            RatingService.rateSite(selectedSite,$scope.site.rating);
            $rootScope.$broadcast('ratingDone',0);
            ngDialog.close();
        }
    });
