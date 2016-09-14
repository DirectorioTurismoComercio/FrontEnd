'use strict';

angular.module('home')
    .controller('HomeController', function ($scope, SearchForResultsFactory,
                                            $location, $mdDialog, siteAndTownSaverService, $log,
                                            messageService, MapService, $window, $rootScope, $translate,
                                            MunicipalitiesDAO) {
        $scope.municipalities = [];

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
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et lorem dui. Cras finibus tempor felis in gravida. Etiam at ante ut metus congue vestibulum id non lectus. Mauris tincidunt, tortor non venenatis molestie, mauris arcu vestibulum quam, at pharetra enim lectus quis est."
        }];

       /* MunicipalitiesDAO.getAllMunicipalities().then(function (municipalities) {
            chooseRandomMunicipalitiesToShow(municipalities);
        }).catch(function (error) {
            $log.error(error);
        });*/

        setHowItWorksTraderImage();

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
            setHowItWorksTraderImage();
        });

        function chooseRandomMunicipalitiesToShow(municipalities) {
            var MUNICIPALITIES_LENGTH = 3;
            $scope.municipalities = [];
            var generatedRandomNumbers = [];

            for (var i = 0; i < MUNICIPALITIES_LENGTH; i++) {
                var random = getDifferentRandomFrom(generatedRandomNumbers, 0, municipalities.length);
                $log.info(random);
                $log.info(generatedRandomNumbers.indexOf(random));

                if (generatedRandomNumbers.indexOf(random) == -1) {
                    generatedRandomNumbers.push(random);
                    $scope.municipalities.push(municipalities[random]);
                }
            }
        }


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


        function setHowItWorksTraderImage() {
            if ($translate.use() == 'es') {
                setHowItWorksTraderImageDevice('como-funciona-comerciante-home_mob-esp.jpg', 'como-funciona-comerciante-home-esp.jpg');
            }

            if ($translate.use() == 'en') {
                setHowItWorksTraderImageDevice('como-funciona-comerciante-home_mob-eng.jpg', 'como-funciona-comerciante-home-eng.jpg');
            }
        }

        function setHowItWorksTraderImageDevice(imageMobile, imageDesktop) {
            $scope.howItWorksImage = $window.innerWidth < 992 ? imageMobile : imageDesktop;
        }

        function getDifferentRandomFrom(randomNumbers, min, max) {
            var random = getRandom(min, max);

            while (randomNumbers.indexOf(random) != -1) {
                random = getRandom(min, max);
            }

            return random;
        }

        function getRandom(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        }
    })
;
