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

        $scope.getSubcategoriesOnChange = function (newValue, oldValue) {
            if ($scope.firstCategory == undefined) {
                resetCategoriesModel();
            } else {
                console.log("scope antes de enviar",$scope.firstCategory);
                getSubcategories($scope.firstCategory.id);
            }

            console.log("nuevo valor", newValue, "viejo valor", (oldValue));
            newValue.isSelected=true;

            for(var i=0; i<$scope.arrayCategories.length; i++){
                if(oldValue==$scope.arrayCategories[i].id){
                    $scope.arrayCategories[i].isSelected=false;
                }
            }

            console.log($scope.arrayCategories);
           // oldValue=JSON.parse(oldValue);
            //oldValue.isSelected=false;

            //$scope.arrayCategories[$scope.businessFirstCategories.category-1].isSelected=true;

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

            verifyAddSecondCategoryButtonVisibility();
            verifyAddThirdCategoryButtonVisibility();

        }



        $scope.collapseSecondListCategory=function(){
            $scope.listSecondCategoryIsVisible=false;
            $scope.compressedSecondCategoryIsVisible=true;


            console.log("las 2das categorias",$scope.secondCategories);
            console.log("las businesscategorias",$scope.businessSecondCategories);
            console.log("las businesscategorias del compressed",$scope.firstCategory-1);
        }

        $scope.editSecondCategory=function(){
            $scope.compressedFirstCategoryIsVisible=true;
            $scope.listFirstCategoryIsVisible=false;

            $scope.listSecondCategoryIsVisible=true;
            $scope.compressedSecondCategoryIsVisible=false;

            $scope.listThirdCategoryIsVisible=false;
            $scope.compressedThirdCategoryIsVisible=true;

            verifyAddThirdCategoryButtonVisibility();
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



            //createThirdCategoriesList();
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

        function verifyAddSecondCategoryButtonVisibility(){
            if($scope.secondcategoryExists && $scope.businessSecondCategories==undefined ){
                $scope.secondcategoryExists=false;
            }
        }

        function verifyAddThirdCategoryButtonVisibility(){
            if($scope.thirdcategoryExists && $scope.businessThirdCategories==undefined ){
                $scope.thirdcategoryExists=false;
            }
        }

        function createSecondCategoriesList(){

            console.log($scope.businessFirstCategories);

            var secondCategories=[];
            var i=0;

            for(i; i<$scope.firstCategories.length;i++){
                secondCategories[i]=$scope.firstCategories[i];
            }


            $scope.secondCategories=secondCategories;

            $scope.secondCategories.splice(($scope.businessFirstCategories.category-1),1);


        }

        function createThirdCategoriesList(){
            var thirdCategories=[];
            var i=0;

            for(i; i<$scope.secondCategories.length;i++){
                thirdCategories[i]=$scope.secondCategories[i];
            }


            $scope.thirdCategories=thirdCategories;


            $scope.thirdCategories.splice(($scope.firstCategory-1),1);

        }

        function resetCategoriesModel(){
            $scope.firstSubcategories = undefined;
            $scope.businessFirstCategories.subcategory = undefined;
        }

        function getSubcategories(categoryObjectId){
            console.log("scope despues de enviar",categoryObjectId);
            categories.getSubcategories(categoryObjectId).then(function (response) {
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