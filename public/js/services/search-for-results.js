(function () {
    angular.module('gemStore')
        .factory('SearchForResultsFactory', ['$resource', 'API_CONFIG', function ($resource, API_CONFIG) {

            var serverResults;

            return {
                doSearch: doSearch,
                getResults: getResults
            };

            function doSearch(result) {
                return $resource(API_CONFIG.url + '/buscar', {search: '@search'}).query({search: result},
                    function (data) {
                        serverResults = data;
                    }
                ).$promise;
            }

            function getResults() {
                return serverResults;
            }

        }]);
})();