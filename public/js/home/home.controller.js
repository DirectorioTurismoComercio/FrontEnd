'use strict';

angular.module('home')
    .controller('HomeController', function ($scope, SearchForResultsFactory,
                                            $location, $mdDialog, siteAndTownSaverService,
                                            messageService, MapService, $window, $rootScope, $translate) {

        siteAndTownSaverService.resetSearchAndRoute();
        siteAndTownSaverService.setSelectedCategory(undefined);
        $scope.municipalities = [{
            name: "Faca",
            img: "http://localhost:8000/Fotos/Fotos/1.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et lorem dui. Cras finibus tempor felis in gravida. Etiam at ante ut metus congue vestibulum id non lectus. Mauris tincidunt, tortor non venenatis molestie, mauris arcu vestibulum quam, at pharetra enim lectus quis est."
        }, {
            name: "Cota",
            img: "http://localhost:8000/Fotos/Fotos/2.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et lorem dui. Cras finibus tempor felis in gravida. Etiam at ante ut metus congue vestibulum id non lectus. Mauris tincidunt, tortor non venenatis molestie, mauris arcu vestibulum quam, at pharetra enim lectus quis est."
        }, {
            name: "Faca",
            img: "http://localhost:8000/Fotos/Fotos/3.jpg",
            description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et lorem dui. Cras finibus tempor felis in gravida. Etiam at ante ut metus congue vestibulum id non lectus. Mauris tincidunt, tortor non venenatis molestie, mauris arcu vestibulum quam, at pharetra enim lectus quis est."
        }];

        setHowItWorksTraderImage('como-funciona-comerciante-home_mob-esp.jpg', 'como-funciona-comerciante-home-esp.jpg');

        $scope.doSearch = function (result) {
            if (result != undefined) {
                MapService.clearRoute();
                getSites(result);
            }
            else {
                messageService.showErrorMessage("Por favor ingrese un criterio de busqueda");
            }
        };

        $scope.showRoute = function () {
            $location.path('/map');
        };

        $scope.goToHowItWorks = function () {
            $location.path('/howitworks');
        };

        $scope.goToHowItWorksTrader = function () {
            $location.path('/howitworksTrader');
        };


        $rootScope.$on('$translateChangeSuccess', function () {
            if ($translate.use() == 'es') {
                setHowItWorksTraderImage('como-funciona-comerciante-home_mob-esp.jpg', 'como-funciona-comerciante-home-esp.jpg');
            }

            if ($translate.use() == 'en') {
                setHowItWorksTraderImage('como-funciona-comerciante-home_mob-eng.jpg', 'como-funciona-comerciante-home-eng.jpg');
            }

        });


        function getSites(result) {
            SearchForResultsFactory.doSearch(result).then(function (response) {
                if (response.length > 0) {
                    siteAndTownSaverService.setCurrentSearchedSite(result);
                    $location.path('/map');
                } else {
                    messageService.showErrorMessage("No se han encontrado resultados");
                }
            }).catch(function (error) {
                messageService.showErrorMessage("GET_SITES_ERROR");
            });
        }

        function setHowItWorksTraderImage(imageMobile, imageDesktop) {
            $scope.howItWorksImage = $window.innerWidth < 992 ? imageMobile : imageDesktop;

        }
    })
;
