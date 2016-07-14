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

        $scope.secondcategoryExists=false;
        $scope.listSecondCategoryIsVisible=false;
        $scope.compressedSecondCategoryIsVisible=false;

        $scope.thirdcategoryExists=false;
        $scope.listThirdCategoryIsVisible=false;
        $scope.compressedThirdCategoryIsVisible=false;


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

        $scope.collapseFirstListCategory=function(){
            $scope.listFirstCategoryIsVisible=false;
            $scope.compressedFirstCategoryIsVisible=true;
        }

        $scope.editFirstCategory=function(){
            $scope.compressedFirstCategoryIsVisible=false;
            $scope.listFirstCategoryIsVisible=true;

            $scope.listSecondCategoryIsVisible=false;
            $scope.compressedSecondCategoryIsVisible=true;

            $scope.listThirdCategoryIsVisible=false;
            $scope.compressedThirdCategoryIsVisible=true;
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

        $scope.collapseSecondListCategory=function(){
            $scope.listSecondCategoryIsVisible=false;
            $scope.compressedSecondCategoryIsVisible=true;
        }

        $scope.editSecondCategory=function(){
            $scope.compressedFirstCategoryIsVisible=true;
            $scope.listFirstCategoryIsVisible=false;

            $scope.listSecondCategoryIsVisible=true;
            $scope.compressedSecondCategoryIsVisible=false;

            $scope.listThirdCategoryIsVisible=false;
            $scope.compressedThirdCategoryIsVisible=true;
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

        $scope.collapseThirdListCategory=function(){
            $scope.listThirdCategoryIsVisible=false;
            $scope.compressedThirdCategoryIsVisible=true;
        }

        $scope.editThirdCategory=function(){
            $scope.compressedFirstCategoryIsVisible=true;
            $scope.listFirstCategoryIsVisible=false;

            $scope.listSecondCategoryIsVisible=false;
            $scope.compressedSecondCategoryIsVisible=true;

            $scope.listThirdCategoryIsVisible=true;
            $scope.compressedThirdCategoryIsVisible=false;
        }



        $scope.addFirstCategory=function(){
            $scope.compressedFirstCategoryIsVisible=true;
            $scope.listFirstCategoryIsVisible=false;

            $scope.listSecondCategoryIsVisible=true;
            $scope.compressedSecondCategoryIsVisible=false;

            $scope.secondcategoryExists=true;


        }

        $scope.addSecondCategory=function(){
            if(!$scope.thirdcategoryExists){
                $scope.compressedFirstCategoryIsVisible=true;
                $scope.listFirstCategoryIsVisible=false;

                $scope.compressedSecondCategoryIsVisible=true;
                $scope.listSecondCategoryIsVisible=false;


                $scope.listThirdCategoryIsVisible=true;
                $scope.compressedThirdCategoryIsVisible=false;

                $scope.thirdcategoryExists=true;
            }

            if($scope.thirdcategoryExists && !$scope.secondcategoryExists){
                $scope.compressedFirstCategoryIsVisible=true;
                $scope.listFirstCategoryIsVisible=false;

                $scope.compressedSecondCategoryIsVisible=false;
                $scope.listSecondCategoryIsVisible=true;


                $scope.listThirdCategoryIsVisible=false;
                $scope.compressedThirdCategoryIsVisible=true;

                $scope.secondcategoryExists=true;
            }
        }


        $scope.deleteSecondCategory=function(){
            $scope.compressedSecondCategoryIsVisible=false;
            $scope.listSecondCategoryIsVisible=false;
            $scope.secondcategoryExists=false;
        }

        $scope.deleteThirdCategory=function(){
            $scope.compressedThirdCategoryIsVisible=false;
            $scope.listThirdCategoryIsVisible=false;
            $scope.thirdcategoryExists=false;
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