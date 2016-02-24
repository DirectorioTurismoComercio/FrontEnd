(function () {
    //'gemStore' module depends on 'store-products' modules
    angular.module('gemStore', ['ngRoute', 'ngResource', 'userModule', 'ngAnimate', 'ngMaterial', 'ngAria', 'angularUtils.directives.dirPagination', 'ngMessages', 'ngCookies', 'ngSanitize', 'com.2fdevs.videogular',
                                'constants', 'auth'])
        .config(function ($interpolateProvider) {
            $interpolateProvider.startSymbol('%%');
            $interpolateProvider.endSymbol('%%');
        })
        //Autenticación
        // .config(['$httpProvider', function($httpProvider){
        //   $httpProvider.defaults.xsrfCookieName = 'csrftoken';
        //   $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
        // }])
})();