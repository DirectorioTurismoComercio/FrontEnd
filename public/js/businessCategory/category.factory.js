'use strict';

angular.module('businessCategory', [])
    .factory('categories',function ($filter) {
        /*VARIABLES DE EJEMPLO HASTA QUE SE IMPLEMENTE CATEGORIAS EN BACKEND*/
        var service = {};


        var categorylist = [
            { "id": 1, "category": "Restaurantes" },
            { "id": 2, "category": "Tiendas" },
            { "id": 3, "category": "Entretenimiento" },
        ];

        var subcategorylist = [
            {"Id":1, "subcategory":"Comida Rápida", "categoryID": 1},
            {"Id":2, "subcategory":"Económico", "categoryID": 1},
            {"Id":3, "subcategory":"Buffet", "categoryID": 1},
            {"Id":4, "subcategory":"Viveres", "categoryID": 2},
            {"Id":5, "subcategory":"Ropa", "categoryID": 2},
            {"Id":6, "subcategory":"Cine", "categoryID": 3},
            {"Id":7, "subcategory":"Centro Comercial", "categoryID": 3},
            {"Id":8, "subcategory":"Música", "categoryID": 3}
        ];


        service.getCategories = function(){
            return categorylist;
        };

        service.getSubcategories = function(categoryID){
            var subcategories = ($filter('filter')(subcategorylist, {categoryID: categoryID}));
            return subcategories;
        };


        return service;

    });
