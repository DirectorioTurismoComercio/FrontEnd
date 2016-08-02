(function () {
    angular.module('registerTrader')
        .factory("UserFactory", ['$resource', 'Constantes',
            function ($resource, Constantes) {
                return $resource(Constantes.url + "/rest-auth/registration/", {
                        id: '@id'
                    },
                    {
                        update: {
                            method: "PUT"
                        }
                    });
            }]);
})();