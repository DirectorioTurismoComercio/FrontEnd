(function () {
    angular.module('gemStore', ['ngRoute', 'ngResource', 'ngAnimate', 'ngMaterial', 'ngAria', 'angularUtils.directives.dirPagination', 'ngMessages', 'ngCookies', 'ngSanitize', 'com.2fdevs.videogular',
                                'constants', 'auth', 'satellizer'])
        .config(function ($interpolateProvider, API_CONFIG, $authProvider) {
            $interpolateProvider.startSymbol('%%');
            $interpolateProvider.endSymbol('%%');

            $authProvider.facebook({
                clientId: API_CONFIG.facebookID
            });

           /* $authProvider.oauth2({
                name: 'foursquare',
                url: '/auth/foursquare',
                clientId: 'Foursquare Client ID',
                redirectUri: window.location.origin,
                authorizationEndpoint: 'https://foursquare.com/oauth2/authenticate',
            });*/
        })
})();