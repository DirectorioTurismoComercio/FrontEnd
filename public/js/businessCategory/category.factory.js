'use strict';

angular.module('businessCategory', [])
    .factory('categories',function ($filter, $resource, API_CONFIG) {
        var service = {};

        service.getCategories = function(){
            return $resource(API_CONFIG.url+API_CONFIG.categorias+'?nivel=1').query().$promise;
        };

        service.getSubcategories = function(parentCategoryId){
            return $resource(API_CONFIG.url+API_CONFIG.categorias+'?nivel=2&categoria_padre='+parentCategoryId).query().$promise;
        };

        return service;
    });
