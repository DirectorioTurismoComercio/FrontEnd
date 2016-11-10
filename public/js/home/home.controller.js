'use strict';

angular.module('home')
    .controller('HomeController', function ($scope, SearchForResultsFactory,
                                            $location, $mdDialog, siteAndTownSaverService, $log,
                                            messageService, MapService, $window, $rootScope, $translate,
                                            MunicipalitiesDAO, requestedMunicipalityDetail, navigationService) {
        $scope.municipalities = [];
        $scope.languageSelected=$translate.use();
        navigationService.setClickedLogoButton(false);
        siteAndTownSaverService.resetSearchAndRoute();
        siteAndTownSaverService.setSelectedCategory(undefined);
        setHowItWorksTraderImage();

        MunicipalitiesDAO.getAllMunicipalities().then(function (municipalities) {
            chooseRandomMunicipalitiesToShow(municipalities);
        }).catch(function (error) {
            $log.error(error);
        });

        $scope.showMunicipalityDetail = function (municipality) {
            requestedMunicipalityDetail.setMunicipality(municipality);
            navigationService.setMunicipalityDetailNavigation("fromHome");
            siteAndTownSaverService.setQueryMadeByUser(undefined);
            $location.path('/map');
        };

        $scope.doSearch = function (result) {
            $scope.loader=true;
            navigationService.setMunicipalityDetailNavigation(undefined);
            if (result != undefined) {
                MapService.clearRoute();
                getSites(result);
            }
            else {
                messageService.showErrorMessage("ERROR_NO_KEYWORD_SEARCH");
                $scope.loader=false;
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
            $scope.languageSelected = $translate.use();
        });

        $scope.getMunicipalityDescription=function(municipality){
            if($scope.languageSelected=='en'){
                return municipality.description;
            }
            if($scope.languageSelected=='es'){
                return municipality.descripcion;
            }
        }

        function chooseRandomMunicipalitiesToShow(municipalities) {
            var MUNICIPALITIES_LENGTH = Math.min(municipalities.length, 3);
            var generatedRandomNumbers = [];
            $scope.municipalities = [];


            for (var i = 0; i < MUNICIPALITIES_LENGTH; i++) {
                var random = getDifferentRandomFrom(generatedRandomNumbers, 0, municipalities.length);

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
                    messageService.showErrorMessage("ERROR_NO_RESULTS");
                    $scope.loader=false;
                }
            }).catch(function (error) {
                messageService.showErrorMessage("GET_SITES_ERROR");
                $scope.loader=false;
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
            var random;

            if (randomNumbers.length < (max - min)) {
                random = getRandom(min, max);

                while (randomNumbers.indexOf(random) != -1) {
                    random = getRandom(min, max);
                }
            }

            return random;
        }

        function getRandom(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        }
    });
