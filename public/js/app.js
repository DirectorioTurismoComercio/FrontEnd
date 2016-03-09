(function () {
    angular.module('gemStore', ['ngRoute', 'ngResource', 'ngAnimate', 'ngMaterial', 'ngAria', 'angularUtils.directives.dirPagination', 'ngMessages', 'ngCookies', 'ngSanitize', 'com.2fdevs.videogular',
                                'constants', 'auth'])
        .config(function ($interpolateProvider) {
            $interpolateProvider.startSymbol('%%');
            $interpolateProvider.endSymbol('%%');
        })
})();