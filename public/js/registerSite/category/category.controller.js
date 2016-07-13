'use strict';

angular.module('registerSite')
    .controller('categoryController', function ($scope, $auth, $http, messageService,
                                                API_CONFIG, categories,
                                                $location, MunicipiosFactory, authenticationService, siteAndTownSaverService,
                                                siteInformationService, $translate, navigationService) {

        $scope.businessFirstCategories = siteInformationService.businessFirstCategories;
        $scope.businessSecondCategories = siteInformationService.businessSecondCategories;
        $scope.businessThirdCategories = siteInformationService.businessThirdCategories;

        $scope.showRequiredFieldMessage = false;

        $scope.listFirstCategoryIsVisible=true;
        $scope.compressedFirstCategoryIsVisible=false;
        $scope.firstAddCategoryButtonIsVisible=true;

        $scope.listSecondCategoryIsVisible=false;
        $scope.compressedSecondCategoryIsVisible=false;
        $scope.secondAddCategoryButtonIsVisible=true;

        $scope.listThirdCategoryIsVisible=false;
        $scope.compressedSecondCategoryIsVisible=false;
        $scope.secondAddCategoryButtonIsVisible=true;

        $scope.user={
            categorias:''
        }



        categories.getCategories().then(function (response) {
            $scope.firstCategories = response;
            $scope.secondCategories = response;
            $scope.thirdCategories = response;
        }).catch(function (error) {
            console.log("Hubo un error", error);
        });

        $scope.getFirstSubcategories = function () {
            if ($scope.businessFirstCategories.category == undefined) {
                resetCategoriesModel();
            } else {
                getSubcategories();
            }
        }


        $scope.getSecondSubCategories=function(){
            if ($scope.businessSecondCategories.category == undefined) {
                $scope.secondSubcategories = undefined;
                $scope.businessSecondCategories.subcategory = undefined;
            } else {
                categories.getSubcategories($scope.businessSecondCategories.category).then(function (response) {
                    $scope.secondSubcategories = response;
                }).catch(function (error) {
                    console.log("hubo un error", error);
                });
            }
        }

        $scope.getThirdSubCategories=function(){
            if ($scope.businessThirdCategories.category == undefined) {
                $scope.thirdSubcategories = undefined;
                $scope.businessThirdCategories.subcategory = undefined;
            } else {
                categories.getSubcategories($scope.businessThirdCategories.category).then(function (response) {
                    $scope.thirdSubcategories = response;
                }).catch(function (error) {
                    console.log("hubo un error", error);
                });
            }
        }



        $scope.addFirstCategory=function(){
            $scope.compressedFirstCategoryIsVisible=true;
            $scope.listFirstCategoryIsVisible=false;
            $scope.firstAddCategoryButtonIsVisible=false;

            $scope.listSecondCategoryIsVisible=true;


        }

        $scope.addSecondCategory=function(){
            $scope.compressedSecondCategoryIsVisible=true;
            $scope.listSecondCategoryIsVisible=false;
            $scope.secondAddCategoryButtonIsVisible=false;

            $scope.listThirdCategoryIsVisible=true;


        }

        $scope.editFirstCategory=function(){
            $scope.compressedFirstCategoryIsVisible=false;
            $scope.listFirstCategoryIsVisible=true;
        }

        $scope.changeViewLocation = function () {

            console.log("lo que eligio", $scope.user);

            /*if ($scope.registerSiteForm.$valid) {
                saveDataAndChangeView('/location');
            } else {
                $scope.showRequiredFieldMessage = true;
            }*/
        };

        $scope.changeViewBusinessInformation=function(){
            $location.path("/businessinformation");
        }

        function resetCategoriesModel(){
            $scope.firstSubcategories = undefined;
            $scope.businessFirstCategories.subcategory = undefined;
        }

        function getSubcategories(){
            categories.getSubcategories($scope.businessFirstCategories.category).then(function (response) {
                $scope.firstSubcategories = response;
            }).catch(function (error) {
                console.log("hubo un error", error);
            });
        }

        function saveDataAndChangeView(view) {
            saveSiteInformation();
            $location.path(view);
        }
        function saveSiteInformation() {
            siteInformationService.businessFirstCategories = $scope.businessFirstCategories;
        }

    });