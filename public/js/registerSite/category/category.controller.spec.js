'use strict';

describe('Controller: categoryController', function () {
    var registerSiteController, $scope, deferred, testcategories, testlocation;

    beforeEach(module('gemStore'));

    beforeEach(module('gemStore', function ($provide, $translateProvider) {

        $provide.factory('customLoader', function ($q) {
            return function () {
                var deferred = $q.defer();
                deferred.resolve({});
                return deferred.promise;
            };
        });

        $translateProvider.useLoader('customLoader');

    }));


    beforeEach(inject(function ($controller, $http, $rootScope, $q, $location,categories) {
        $scope = $rootScope.$new();
        deferred = $q.defer();
        testcategories=categories;

        spyOn($location,'path');
        spyOn(categories, 'getCategories').and.returnValue(deferred.promise);
        spyOn(categories, 'getSubcategories').and.returnValue(deferred.promise);
        registerSiteController = $controller('categoryController', {
            $scope: $scope,
            categories:testcategories

        });
    }));

    it('Should first category be displayed On load for first time category page', function () {
        expect($scope.listFirstCategoryIsVisible).toBe(true);
    });

    it('Should second category does not exists On load for first time category page', function () {
        expect($scope.listSecondCategoryExists).toBe(false);
    });

    it('Should third category does not exists On load for first time category page', function () {
        expect($scope.listThirdCategoryExists).toBe(false);
    });

    it('Should show add two more categories when user picks a main category and hide add one more category', function () {
        $scope.getSubcategoriesOnChange(1,1,1);
        expect($scope.hadTwoCategoriesLeft).toBe(true);
        expect($scope.hadOneCategoriesLeft).toBe(false);
    });

    it('Should collapse first category when user clicks on collapse first category', function () {
        $scope.collapseCategory(1);
        expect($scope.listFirstCategoryIsVisible).toBe(false);
    });

    it('Should show first category when user clicks on edit first category', function () {
        $scope.editcategory(1);
        expect($scope.listFirstCategoryIsVisible).toBe(true);
    });

    it('Should collapse first category when user clicks add aditional category 1', function () {
        $scope.addFirstAditionalCategory();
        expect($scope.listFirstCategoryIsVisible).toBe(false);
    });

    it('Should exist and show second category when user clicks add aditional category 1', function () {
        $scope.addFirstAditionalCategory();
        expect($scope.listSecondCategoryExists).toBe(true);
        expect($scope.listSecondCategoryIsVisible).toBe(true);
    });

    it('Should hide add two more categories when clicks in add aditional category 1', function () {
        $scope.getSubcategoriesOnChange(1,1,1);
        $scope.addFirstAditionalCategory();
        expect($scope.hadTwoCategoriesLeft).toBe(false);
    });

    it('Should show add one more category and hide add two more categories when user picks a second category', function () {
        $scope.getSubcategoriesOnChange(1,1,2);
        expect($scope.hadTwoCategoriesLeft).toBe(false);
        expect($scope.hadOneCategoriesLeft).toBe(true);
    });

    it('Should collapse second category when user clicks on collapse second category', function () {
        $scope.collapseCategory(2);
        expect($scope.listSecondCategoryIsVisible).toBe(false);
    });

    it('Should show second category when user clicks on edit second category', function () {
        $scope.editcategory(2);
        expect($scope.listSecondCategoryIsVisible).toBe(true);
    });

    it('Should collapse second category when user clicks add aditional category 2', function () {
        addUntilThirdCategory($scope);
        expect($scope.listSecondCategoryIsVisible).toBe(false);
    });

    it('Should hide add aditional category 2', function () {
        addUntilThirdCategory();
        expect($scope.hadOneCategoriesLeft).toBe(false);
    });

    it('Should exist and show third category when user clicks add aditional category 2', function () {
        addUntilThirdCategory();
        expect($scope.listThirdCategoryExists).toBe(true);
        expect($scope.listThirdCategoryIsVisible).toBe(true);
    });

    it('Should collapse third category when user clicks on collapse third category', function () {
        addUntilThirdCategory();
        $scope.collapseCategory(3);
        expect($scope.listThirdCategoryIsVisible).toBe(false);
    });

    it('Should show third category when user clicks on edit third category', function () {
        addUntilThirdCategory();
        $scope.editcategory(3);
        expect($scope.listThirdCategoryIsVisible).toBe(true);
    });

    it('Should hide second and third category when user clicks on edit first category', function () {
        addUntilThirdCategory();
        $scope.editcategory(1);
        expect($scope.listSecondCategoryIsVisible).toBe(false);
        expect($scope.listThirdCategoryIsVisible).toBe(false);
    });

    it('Should hide first and third category when user clicks on edit second category', function () {
        addUntilThirdCategory();
        $scope.editcategory(2);
        expect($scope.listFirstCategoryIsVisible).toBe(false);
        expect($scope.listThirdCategoryIsVisible).toBe(false);
    });

    it('Should hide first and second category when user clicks on edit third category', function () {
        addUntilThirdCategory();
        $scope.editcategory(1);
        $scope.editcategory(3);
        expect($scope.listFirstCategoryIsVisible).toBe(false);
        expect($scope.listSecondCategoryIsVisible).toBe(false);
    });


    function addUntilThirdCategory() {
        $scope.getSubcategoriesOnChange(1, 1, 1);
        $scope.addFirstAditionalCategory();
        $scope.getSubcategoriesOnChange(1, 1, 2);
        $scope.addSecondAditionalCategory();
    }


});
