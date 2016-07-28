'use strict';

angular.module('registerSite')
    .controller('categoryController', function ($scope, $auth, $http, messageService,
                                                API_CONFIG, categories,
                                                $location, MunicipiosFactory, authenticationService, siteAndTownSaverService,
                                                siteInformationService) {

        $scope.firstCategory = siteInformationService.firstCategory;
        $scope.secondCategory = siteInformationService.secondCategory;
        $scope.thirdCategory = siteInformationService.thirdCategory;

        $scope.showRequiredFieldMessage = false;


        $scope.hadTwoCategoriesLeft = false;
        $scope.hadOneCategoriesLeft = false;


        $scope.businessSubcategories =siteInformationService.businessSubcategories;


        $scope.arrayCategories = [];


        collapseFirstCategoryIfExists();
        collapseSecondCategoryIfExists();
        collapseThirdCategoryIfExists();

        categories.getCategories().then(function (response) {
            $scope.firstCategories = response;
            for (var i = 0; i < $scope.firstCategories.length; i++) {
                $scope.arrayCategories[i] = $scope.firstCategories[i];
                $scope.arrayCategories[i].isSelected = false;
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


        $scope.categoryOptionFilter = function (categoryOption) {
            return function (categoryObject) {
                return categoryObject.isSelected == false || categoryObject.isSelected == categoryOption;
            }
        }

        $scope.collapseCategory = function (category) {
            switch (category) {
                case 1:
                    $scope.listFirstCategoryIsVisible = false;
                    break;
                case 2:
                    $scope.listSecondCategoryIsVisible = false;
                    break;
                case 3:
                    $scope.listThirdCategoryIsVisible = false;
                    break;
            }
        }


        $scope.editcategory = function (category) {
            switch (category) {
                case 1:
                    $scope.listFirstCategoryIsVisible = true;
                    $scope.listSecondCategoryIsVisible = false;
                    $scope.listThirdCategoryIsVisible = false;
                    deleteSecondCategoryIfIsNull();
                    deleteThirdCategoryIfIsNull();
                    break;
                case 2:
                    $scope.listFirstCategoryIsVisible = false;
                    $scope.listSecondCategoryIsVisible = true;
                    $scope.listThirdCategoryIsVisible = false;
                    deleteThirdCategoryIfIsNull();
                    break;
                case 3:
                    $scope.listFirstCategoryIsVisible = false;
                    $scope.listSecondCategoryIsVisible = false;
                    $scope.listThirdCategoryIsVisible = true;
                    break;
            }
        }

        $scope.addFirstAditionalCategory = function () {
            $scope.listFirstCategoryIsVisible = false;

            $scope.listSecondCategoryExists = true;
            $scope.listSecondCategoryIsVisible = true;

            $scope.hadTwoCategoriesLeft = false

        }

        $scope.addSecondAditionalCategory = function () {
            $scope.listSecondCategoryIsVisible = false;

            $scope.listThirdCategoryExists = true;
            $scope.listThirdCategoryIsVisible = true;
            $scope.listFirstCategoryIsVisible = false;


            if (!$scope.listSecondCategoryExists) {
                $scope.listSecondCategoryExists = true;
                $scope.listSecondCategoryIsVisible = true;
                $scope.listFirstCategoryIsVisible = false;
                $scope.listThirdCategoryIsVisible = false;
            }


            $scope.hadOneCategoriesLeft = false;

        }

        $scope.deleteCategory = function (category) {
            switch (category) {
                case 2:
                    $scope.listSecondCategoryIsVisible = false;
                    $scope.listSecondCategoryExists = false;
                    $scope.secondCategory = null;
                    $scope.secondSubcategories = null;
                    break;
                case 3:
                    $scope.listThirdCategoryIsVisible = false;
                    $scope.listThirdCategoryExists = false;
                    $scope.thirdCategory = null;
                    $scope.thirdSubcategories = null;
                    break;
            }

            checkOneCategoryLeftButtonVisible();
            checkTwoCategoriesLeftButtonVisible()

        }

        $scope.changeViewLocation = function () {
            if ($scope.registerSiteForm.$valid) {
                saveDataAndChangeView('/location');
            } else {
                $scope.showRequiredFieldMessage = true;
            }
        };

        $scope.changeViewBusinessInformation = function () {
            $location.path("/businessinformation");
        }

        function collapseFirstCategoryIfExists(){
            if($scope.firstCategory==undefined || $scope.firstCategory==null){
                $scope.listFirstCategoryIsVisible = true;
            }else{
                $scope.listFirstCategoryIsVisible = false;
                getSubcategories($scope.firstCategory.id,1);
            }
        }


        function collapseSecondCategoryIfExists(){
            if($scope.secondCategory==undefined || $scope.secondCategory==null){
                $scope.listSecondCategoryExists = false;
                $scope.listSecondCategoryIsVisible = false;
            }else{
                $scope.listSecondCategoryExists = true;
                $scope.listSecondCategoryIsVisible = false;
                getSubcategories($scope.secondCategory.id,2);
            }
        }


        function collapseThirdCategoryIfExists(){
            if($scope.thirdCategory==undefined || $scope.thirdCategory==null){
                $scope.listThirdCategoryExists = false;
                $scope.listThirdCategoryIsVisible = false;
            }else{
                $scope.listThirdCategoryExists = true;
                $scope.listThirdCategoryIsVisible = false;
                getSubcategories($scope.thirdCategory.id,3);

            }
        }


        function checkOneCategoryLeftButtonVisible() {
            if (($scope.listSecondCategoryExists && !$scope.listThirdCategoryExists) || (!$scope.listSecondCategoryExists && $scope.listThirdCategoryExists)) {
                $scope.hadOneCategoriesLeft = true;
                $scope.hadTwoCategoriesLeft = false;
            }
        }

        function checkTwoCategoriesLeftButtonVisible() {
            if (!$scope.listSecondCategoryExists && !$scope.listThirdCategoryExists) {
                $scope.hadOneCategoriesLeft = false;
                $scope.hadTwoCategoriesLeft = true;
            }
        }

        function checkNoneCategoriesLeftButtonsVisible() {
            if ($scope.listThirdCategoryExists && $scope.listSecondCategoryExists) {
                $scope.hadTwoCategoriesLeft = false;
                $scope.hadOneCategoriesLeft = false;
            }
        }


        function deleteSecondCategoryIfIsNull() {
            if ($scope.listSecondCategoryExists && $scope.secondCategory == null) {
                $scope.deleteCategory(2);
            }
        }

        function deleteThirdCategoryIfIsNull() {
            if ($scope.listThirdCategoryExists && $scope.thirdCategory == null) {
                $scope.deleteCategory(3);
            }
        }


        function toggleSelectedCategories(newValue, oldValue, category) {

            if (category == 1) {
                $scope.hadTwoCategoriesLeft = true;
            }

            if (category == 2) {
                $scope.hadOneCategoriesLeft = true;
            }

            checkOneCategoryLeftButtonVisible();
            checkNoneCategoriesLeftButtonsVisible();


            try {
                newValue.isSelected = category;
            } catch (error) {
            }


            for (var i = 0; i < $scope.arrayCategories.length; i++) {
                if (oldValue == $scope.arrayCategories[i].id) {
                    $scope.arrayCategories[i].isSelected = false;
                }
            }
        }

        function resetCategoriesModel(category) {
            setSubcategories(category, undefined);
        }

        function getSubcategories(categoryObjectId, category) {
            categories.getSubcategories(categoryObjectId).then(function (response) {
                setSubcategories(category, response);
            }).catch(function (error) {
                console.log("hubo un error", error);
            });
        }

        function setSubcategories(category, subcategories) {
            switch (category) {
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
            siteInformationService.firstCategory = $scope.firstCategory;
            siteInformationService.secondCategory = $scope.secondCategory;
            siteInformationService.thirdCategory = $scope.thirdCategory;
            siteInformationService.businessSubcategories = $scope.businessSubcategories;
        }

    });