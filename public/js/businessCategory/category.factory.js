'use strict';

angular.module('businessCategory', [])
    .factory('categories',function ($filter) {
        /*VARIABLES DE EJEMPLO HASTA QUE SE IMPLEMENTE CATEGORIAS EN BACKEND*/
        var service = {};


        var countrylist = [
            { "id": 1, "country": "Restaurantes" },
            { "id": 2, "country": "Tiendas" },
            { "id": 3, "country": "Entretenimiento" },
        ];

        var statelist = [
            {"Id":1, "state":"Comida Rápida", "countryId": 1},
            {"Id":2, "state":"Económico", "countryId": 1},
            {"Id":3, "state":"Buffet", "countryId": 1},
            {"Id":4, "state":"Viveres", "countryId": 2},
            {"Id":5, "state":"Ropa", "countryId": 2},
            {"Id":6, "state":"Cine", "countryId": 3},
            {"Id":7, "state":"Centro Comercial", "countryId": 3},
            {"Id":8, "state":"Música", "countryId": 3}
        ];


        service.getCountry = function(){
            return countrylist;
        };

        service.getCountryState = function(countryId){
            var states = ($filter('filter')(statelist, {countryId: countryId}));
            return states;
        };


        return service;

    });
