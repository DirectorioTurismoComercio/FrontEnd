(function () {
    angular.module('gemStore', ['ngRoute', 'ngResource', 'userModule', 'ngAnimate', 'ngMaterial', 'ngAria', 'angularUtils.directives.dirPagination', 'ngMessages', 'ngCookies', 'ngSanitize', 'com.2fdevs.videogular',
                                'constants', 'auth', 'register'])
        .config(function ($interpolateProvider) {
            $interpolateProvider.startSymbol('%%');
            $interpolateProvider.endSymbol('%%');
        })
})();