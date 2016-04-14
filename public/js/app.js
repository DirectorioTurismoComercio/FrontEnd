(function () {
    angular.module('gemStore', ['ngRoute', 'ngResource', 'ngAnimate', 'ngMaterial',
            'ngAria', 'angularUtils.directives.dirPagination', 'ngMessages', 'ngCookies',
            'ngSanitize', 'com.2fdevs.videogular', 'constants', 'auth', 'satellizer', 'map', 'home',
            'businessBrowser', 'dropDownTowns', 'searchAndRouteTabs', 'siteAndTownSaver', 'siteDetail',
            'howItWorks', 'popErrorAlert', 'ecosistemaHeader', 'pascalprecht.translate'])
        .config(function ($interpolateProvider, API_CONFIG, $authProvider, $translateProvider) {
            $interpolateProvider.startSymbol('%%');
            $interpolateProvider.endSymbol('%%');

            $authProvider.baseUrl = API_CONFIG.authBaseURL;
            $authProvider.authToken= 'Token';

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
            $translateProvider.registerAvailableLanguageKeys(['en','es'],{
                'en_*':'en',
                'es_*':'es'
            });

            $translateProvider.translations('es',{
                BUTTON_HOW_IT_WORKS:"¿Cómo funciona?"
            });


            $translateProvider.translations('en',{
                BUTTON_HOW_IT_WORKS:"How it works?"
            });

            $translateProvider.useSanitizeValueStrategy('escape');
            $translateProvider.preferredLanguage('es');
        })
})();