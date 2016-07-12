'use strict';

angular.module('registerSite')
    .controller('categoryController', function ($scope, $auth, $http, messageService,
                                                API_CONFIG, categories,
                                                $location, MunicipiosFactory, authenticationService, siteAndTownSaverService,
                                                siteInformationService, $translate, navigationService) {

        $scope.businessCategories = siteInformationService.businessCategories;


        $scope.showRequiredFieldMessage = false;




        categories.getCategories().then(function (response) {
            $scope.categories = response;
        }).catch(function (error) {
            console.log("Hubo un error", error);
        });

        $scope.getControllerSubcategories = function () {
            if ($scope.businessCategories.category == undefined) {
                resetCategoriesModel();
            } else {
                getSubcategories();
            }
        }

        function resetCategoriesModel(){
            $scope.subcategories = undefined;
            $scope.businessCategories.subcategory = undefined;
        }

        function getSubcategories(){
            categories.getSubcategories($scope.businessCategories.category).then(function (response) {
                $scope.subcategories = response;
            }).catch(function (error) {
                console.log("hubo un error", error);
            });
        }

        $scope.changeViewLocation = function () {
            if ($scope.registerSiteForm.$valid) {
                saveDataAndChangeView('/location');
            } else {
                $scope.showRequiredFieldMessage = true;
            }
        };

        function saveDataAndChangeView(view) {
            saveSiteInformation();
            $location.path(view);
        }
        function saveSiteInformation() {
            siteInformationService.businessCategories = $scope.businessCategories;
        }

    });