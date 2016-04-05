(function () {
    angular.module('gemStore', ['ngRoute', 'ngResource', 'ngAnimate', 'ngMaterial', 'ngAria', 'angularUtils.directives.dirPagination', 'ngMessages', 'ngCookies', 'ngSanitize', 'com.2fdevs.videogular',
                                'constants', 'auth', 'satellizer'])
        .config(function ($interpolateProvider, API_CONFIG, $authProvider) {
            $interpolateProvider.startSymbol('%%');
            $interpolateProvider.endSymbol('%%');
            $authProvider.baseUrl = 'http://127.0.0.1:8000/';

            $authProvider.facebook({
			  name: 'facebook',
			  url: 'api/login/social/token/',
			  clientId: API_CONFIG.facebookID,
			  authorizationEndpoint: 'https://www.facebook.com/v2.5/dialog/oauth',
			  redirectUri: window.location.origin + '/',
			  requiredUrlParams: ['display', 'scope'],
			  scope: ['email'],
			  scopeDelimiter: ',',
			  display: 'popup',
			  type: '2.0',
			  popupOptions: { width: 580, height: 400 }
			});
        })
})();