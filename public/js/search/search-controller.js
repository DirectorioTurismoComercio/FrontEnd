(function () {
    angular.module('gemStore')
        .controller('SearchController',
            ['$scope', 'ResultRetriever', 'SearchForResultsFactory',
                function SearchController($scope, ResultRetriever, SearchForResultsFactory) {
                    $scope.results =null;
                    $scope.serverResults = [];

                    $scope.doSearch = function (typedthings) {
                        $scope.newresults = ResultRetriever.getresults(typedthings, "SuggestionsFactory");
                        $scope.newresults.then(function (data) {
                            $scope.results = data;
                            console.log("sugenrencias", data);

                        }).catch(function(error){
                            console.log("ocurrio un error", error);
                        });
                    }

                    $scope.search = function (result) {
                        SearchForResultsFactory.query({search: result},
                            function (data) {
                                $scope.serverResults = data;
                                console.log("RETORNO",data);
                            }
                        );
                    }

                    $scope.doSearchBySuggestion = function (suggestion) {
                        SearchForResultsFactory.query({search: suggestion},
                            function (data) {
                                $scope.serverResults = data;
                            }
                        );
                    }

                }
            ]);

})();




