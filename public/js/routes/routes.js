(function () {
    angular.module('gemStore')
        .config(function ($routeProvider) {
            $routeProvider
                .when('/', {
                    redirectTo: '/registertrader'
                })
                .otherwise({
                    redirectTo: '/registertrader'
                });
        });
})();
