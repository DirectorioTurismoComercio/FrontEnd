(function () {
    angular.module('registerTrader')
        .factory("UserFactory", ['$resource', 'Constantes',
            function ($resource, Constantes) {
                return $resource(Constantes.url + "/usuarios/:id", {
                        id: '@id'
                    },
                    {
                        update: {
                            method: "PUT"
                        }
                    });
            }]);
})();