'use strict';

angular.module('home')
    .controller('HomeController', function ($scope, SearchForResultsFactory, $location, $mdDialog, siteAndTownSaverService,
                                            popErrorAlertService, geolocation) {

        $scope.routeToController={
            routeFrom:'',
            routeTo:''
        }

        $scope.doSearch = function (result) {
            if(result!= undefined){
                getSites(result);
            }
            else{
                popErrorAlertService.showPopErrorAlert("Por favor ingrese un criterio de busqueda");
            }
        };

        $scope.calculateRoute=function(){
            if($scope.routeToController.routeFrom=='' || $scope.routeToController.routeTo==''){
                popErrorAlertService.showPopErrorAlert("Indique un punto de partida y un destino");
            }else{
                siteAndTownSaverService.setOrigin($scope.routeToController.routeFrom.formatted_address);
                siteAndTownSaverService.setDestination($scope.routeToController.routeTo.formatted_address);
                $location.path('/map');
            }
        }

        $scope.goToHowItWorks=function(){
            $location.path('/howitworks');
        }

        $scope.goToUserPosition=function(){
            console.log("presiono en localizacion usuario");
            geolocation.getLocation().then(function(data){
                $scope.coords = {lat:data.coords.latitude, long:data.coords.longitude};
                console.log("las coordenadas son", $scope.coords);
            });
        }



        function getSites(result){
            SearchForResultsFactory.doSearch(result).then(function (response) {
                if (response.length > 0) {
                    siteAndTownSaverService.setCurrentSearchedSite(result);
                    $location.path('/map');
                } else {
                    popErrorAlertService.showPopErrorAlert("No se han encontrado resultados");
                }
            }).catch(function (error) {
                console.log("ocurrio un error", error);
            });
        }
    });
