angular.module('searchAndRouteTabs')
    .controller('searchTabContentHomeController',function($scope){
        $scope.autocompleteOptions = {
            componentRestrictions: { country: 'co' },
        }
    });