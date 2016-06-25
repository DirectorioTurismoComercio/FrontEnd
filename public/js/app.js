(function () {
    angular.module('gemStore', ['ngRoute', 'ngResource', 'ngAnimate', 'ngMaterial', 'angular-carousel',
            'ngAria', 'angularUtils.directives.dirPagination', 'ngMessages', 'ngCookies', 'directives.clamp',
            'ngSanitize', 'com.2fdevs.videogular', 'constants', 'auth', 'satellizer', 'map', 'home',
            'businessBrowser', 'dropDownTowns', 'searchTabs', 'siteAndTownSaver', 'howItWorks',
            'message', 'appHeader', 'pascalprecht.translate', 'appFooter', 'registerSite',
            'businessCategory', 'mgo-angular-wizard', 'registerTrader', 'login', 'accountInfo'])
        .config(function ($interpolateProvider, API_CONFIG, $authProvider, $translateProvider) {
            $interpolateProvider.startSymbol('%%');
            $interpolateProvider.endSymbol('%%');

            $authProvider.baseUrl = API_CONFIG.authBaseURL;
            $authProvider.authToken = 'Token';

            $authProvider.facebook({
                clientId: '1529648703998052',
                url: '/api/login/social/token/facebook'
            });

            $authProvider.google({
                clientId: '134061854666-op17m2c08s30q3des75on95hib3a4a43.apps.googleusercontent.com',
                url: '/api/login/social/token/google-oauth2',
                redirectUri: window.location.origin + '/'
            });

            $translateProvider.fallbackLanguage('es');
            $translateProvider.registerAvailableLanguageKeys(['en', 'es'], {
                'en_*': 'en',
                'es_*': 'es'
            });

            $translateProvider.useStaticFilesLoader({
                prefix: 'i18n/locale-',
                suffix: '.json'
            });

            $translateProvider.useSanitizeValueStrategy('escape');
            $translateProvider.preferredLanguage('es');
        })
})();