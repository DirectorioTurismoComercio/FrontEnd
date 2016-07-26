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


        $scope.arrayCategories=[];

        categories.getCategories().then(function (response) {
            $scope.firstCategories = response;
           for(var i=0; i<$scope.firstCategories.length; i++){
               $scope.arrayCategories[i]=$scope.firstCategories[i];
               $scope.arrayCategories[i].isSelected=false;
           }

        }).catch(function (error) {
            console.log("Hubo un error", error);
        });

        $scope.getSubcategoriesOnChange = function (newValue, oldValue, category) {
            if (newValue == undefined) {
                resetCategoriesModel(category);
            } else {
                getSubcategories(newValue.id, category);
            }

            toggleSelectedCategories(newValue, oldValue, category);
        }


        $scope.categoryOptionFilter = function(categoryOption) {
            return function(categoryObject) {
                return categoryObject.isSelected == false || categoryObject.isSelected==categoryOption;
            }
        }

        $scope.collapseCategory=function(category){
            switch (category){
                case 1:
                    $scope.listFirstCategoryIsVisible=false; $scope.compressedFirstCategoryIsVisible=true;
                    break;
                case 2:
                    $scope.listSecondCategoryIsVisible=false; $scope.compressedSecondCategoryIsVisible=true;
                    break;
                case 3:
                    $scope.listThirdCategoryIsVisible=false; $scope.compressedThirdCategoryIsVisible=true;
                    break;
            }
        }

        $scope.editFirstCategory=function(){
            $scope.compressedFirstCategoryIsVisible=false;
            $scope.listFirstCategoryIsVisible=true;

            $scope.listSecondCategoryIsVisible=false;
            $scope.compressedSecondCategoryIsVisible=true;

            $scope.listThirdCategoryIsVisible=false;
            $scope.compressedThirdCategoryIsVisible=true;

        }


        $scope.editSecondCategory=function(){
            $scope.compressedFirstCategoryIsVisible=true;
            $scope.listFirstCategoryIsVisible=false;

            $scope.listSecondCategoryIsVisible=true;
            $scope.compressedSecondCategoryIsVisible=false;

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

            console.log("las subcategorias que eligio", $scope.user);

            /*if ($scope.registerSiteForm.$valid) {
                saveDataAndChangeView('/location');
            } else {
                $scope.showRequiredFieldMessage = true;
            }*/
        };

        $scope.changeViewBusinessInformation=function(){
            $location.path("/businessinformation");
        }

        function toggleSelectedCategories(newValue, oldValue, category){
            try{
                newValue.isSelected=category;
            }catch(error){}


            for(var i=0; i<$scope.arrayCategories.length; i++){
                if(oldValue==$scope.arrayCategories[i].id){
                    $scope.arrayCategories[i].isSelected=false;
                }
            }
        }


        function resetCategoriesModel(category){
            setSubcategories(category, undefined);
        }

        function getSubcategories(categoryObjectId, category){
            categories.getSubcategories(categoryObjectId).then(function (response) {
               setSubcategories(category, response);
            }).catch(function (error) {
                console.log("hubo un error", error);
            });
        }

        function setSubcategories (category, subcategories){
            switch (category){
                case 1:
                    $scope.firstSubcategories = subcategories;
                    break;
                case 2:
                    $scope.secondSubcategories = subcategories;
                    break;
                case 3:
                    $scope.thirdSubcategories = subcategories;
                    break;
            }
        }

        function saveDataAndChangeView(view) {
            saveSiteInformation();
            $location.path(view);
        }
        function saveSiteInformation() {
            siteInformationService.businessFirstCategories = $scope.businessFirstCategories;
        }

    });