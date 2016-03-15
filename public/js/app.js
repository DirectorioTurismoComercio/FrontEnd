(function () {
    angular.module('gemStore', ['ngRoute', 'ngResource', 'ngAnimate', 'ngMaterial',
            'ngAria', 'angularUtils.directives.dirPagination', 'ngMessages', 'ngCookies',
            'ngSanitize', 'com.2fdevs.videogular', 'constants', 'auth', 'satellizer', 'map'])
        .config(function ($interpolateProvider, API_CONFIG, $authProvider) {
            $interpolateProvider.startSymbol('%%');
            $interpolateProvider.endSymbol('%%');

            $authProvider.baseUrl = 'http://192.168.33.10:8000';

            $authProvider.facebook({
                clientId: '1529648703998052',
                url: '/api/login/social/token/facebook',
                scope: ['public_profile', 'email', 'publish_actions']
            });

            $authProvider.google({
                clientId: '134061854666-op17m2c08s30q3des75on95hib3a4a43.apps.googleusercontent.com',
                url: '/api/login/social/token/google-oauth2'
            });
        })
})();