(function () {
    angular.module('gemStore', ['ngRoute', 'ngResource', 'ngAnimate', 'ngMaterial', 'ngAria', 'angularUtils.directives.dirPagination', 'ngMessages', 'ngCookies', 'ngSanitize', 'com.2fdevs.videogular',
                                'constants', 'auth'])
        .config(function ($interpolateProvider, API_CONFIG) {
            $interpolateProvider.startSymbol('%%');
            $interpolateProvider.endSymbol('%%');

            window.fbAsyncInit = function() {
                FB.init({
                    appId      : API_CONFIG.facebookID,
                    xfbml      : true,
                    version    : 'v2.3'
                });
            };

            (function(d, s, id){
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) {return;}
                js = d.createElement(s); js.id = id;
                js.src = "//connect.facebook.net/en_US/sdk.js";
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
        })
})();