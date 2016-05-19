(function () {
    angular.module('gemStore')
        .factory('SearchForResultsFactory', ['$resource', 'API_CONFIG','siteAndTownSaverService', function ($resource, API_CONFIG, siteAndTownSaverService) {

            var serverResults;

            return {
                doSearch: doSearch,
                getResults: getResults
            };

            function doSearch(result) {
                var town=siteAndTownSaverService.getCurrentSearchedTown();
                var querySet=undefined;
                if(town){
                    querySet={search: result, id_municipio:town.id};
                }
                else{
                    querySet={search: result};
                }
                return $resource(API_CONFIG.url + '/buscar', {search: '@search'}).query(querySet,
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