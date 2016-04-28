angular.module('searchAndRouteTabs')
    .controller('searchTabContentHomeController',function($scope, geolocation, siteAndTownSaverService){
        $scope.autocompleteOptions = {
            componentRestrictions: { country: 'co' },
        }

        $scope.getUserPosition = function(){
            geolocation.getLocation().then(function(data){
                var coords = {lat:data.coords.latitude, long:data.coords.longitude};
                var formattedCoords=coords.lat+','+coords.long;
                $scope.routeToController.routeFrom="Mi posición actual";
                siteAndTownSaverService.setOrigin(formattedCoords);
            }).catch(function (error){
                alert("No es posible obtener la ubicación");
            });
        }
    });