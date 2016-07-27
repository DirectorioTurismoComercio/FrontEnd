'use strict';

angular.module('registerSite')
    .controller('categoryController', function ($scope, $auth, $http, messageService,
                                                API_CONFIG, categories,
                                                $location, MunicipiosFactory, authenticationService, siteAndTownSaverService,
                                                siteInformationService) {

        $scope.businessFirstCategories = siteInformationService.businessFirstCategories;
        $scope.businessSecondCategories = siteInformationService.businessSecondCategories;
        $scope.businessThirdCategories = siteInformationService.businessThirdCategories;

        $scope.showRequiredFieldMessage = false;



        $scope.listFirstCategoryIsVisible=true;

        $scope.listSecondCategoryExists=false;
        $scope.listSecondCategoryIsVisible=false;

        $scope.listThirdCategoryExists=false;
        $scope.listThirdCategoryIsVisible=false;

        $scope.hadTwoCategoriesLeft=false;
        $scope.hadOneCategoriesLeft=false;




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
                    $scope.listFirstCategoryIsVisible=false;
                    break;
                case 2:
                    $scope.listSecondCategoryIsVisible=false;
                    break;
                case 3:
                    $scope.listThirdCategoryIsVisible=false;
                    break;
            }
        }


        $scope.editcategory=function(category){
            switch (category){
                case 1:
                    $scope.listFirstCategoryIsVisible=true;
                    $scope.listSecondCategoryIsVisible=false;
                    $scope.listThirdCategoryIsVisible=false;
                    break;
                case 2:
                    $scope.listFirstCategoryIsVisible=false;
                    $scope.listSecondCategoryIsVisible=true;
                    $scope.listThirdCategoryIsVisible=false;
                    break;
                case 3:
                    $scope.listFirstCategoryIsVisible=false;
                    $scope.listSecondCategoryIsVisible=false;
                    $scope.listThirdCategoryIsVisible=true;
                    break;
            }
        }


        $scope.addFirstAditionalCategory=function(){
            $scope.listFirstCategoryIsVisible=false;

            $scope.listSecondCategoryExists=true;
            $scope.listSecondCategoryIsVisible=true;

            $scope.hadTwoCategoriesLeft=false

        }

        $scope.addSecondAditionalCategory=function(){
            $scope.listSecondCategoryIsVisible=false;

            $scope.listThirdCategoryExists=true;
            $scope.listThirdCategoryIsVisible=true;

            $scope.hadOneCategoriesLeft=false;
        }


        $scope.deleteSecondCategory=function(){

        }

        $scope.deleteThirdCategory=function(){

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

            if(category==1){
                $scope.hadTwoCategoriesLeft=true;
            }

            if(category==2){
                $scope.hadOneCategoriesLeft=true;
            }


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