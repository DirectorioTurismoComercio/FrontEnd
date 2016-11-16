(function () {
    angular.module('gemStore', ['ngRoute', 'ngResource', 'ngAnimate', 'ngMaterial', 'angular-carousel',
            'ngAria', 'angularUtils.directives.dirPagination', 'ngMessages', 'ngCookies', 'directives.clamp',
            'ngSanitize', 'com.2fdevs.videogular', 'constants', 'auth', 'satellizer', 'map', 'home',
            'businessBrowser', 'dropDownTowns', 'searchTabs', 'siteAndTownSaver', 'howItWorks',
            'message', 'appHeader', 'pascalprecht.translate', 'appFooter', 'registerSite', 'utils',
            'businessCategory', 'mgo-angular-wizard', 'registerTrader', 'login', 'accountInfo', 'ngCookies',
            'navigation', 'checklist-model', 'interceptor', 'ngScrollbars', 'slick', 'Municipality', 'dao',
            'angucomplete-alt', 'images-resizer', 'forgotPassword', 'popup','vote'])
        .config(function ($interpolateProvider, API_CONFIG, $authProvider, $translateProvider, $httpProvider) {
            $interpolateProvider.startSymbol('%%');
            $interpolateProvider.endSymbol('%%');

            $authProvider.baseUrl = API_CONFIG.url;
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

            $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
            $httpProvider.defaults.xsrfCookieName = 'csrftoken';

            //$httpProvider.defaults.headers.common['Cache-Control'] = 'no-cache';
            $httpProvider.defaults.cache = false;

            if (!$httpProvider.defaults.headers.get) {
                $httpProvider.defaults.headers.get = {};
            }
            // $httpProvider.defaults.headers.get['If-Modified-Since'] = '0';

        })
})();