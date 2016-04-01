(function () {
    angular.module('gemStore')
        .controller('SearchController',
            ['$scope', 'ResultRetriever', 'SearchForResultsFactory',
                function SearchController($scope, ResultRetriever, SearchForResultsFactory) {
                    $scope.results =null;
                    $scope.serverResults = [];

                    $scope.doSearch = function (typedthings) {
                        $scope.newresults = ResultRetriever.getresults(typedthings);
                        $scope.newresults.then(function (data) {
                            $scope.results = data;
                        });
                    }

                    $scope.search = function (result) {
                        SearchForResultsFactory.query({search: result},
                            function (data) {
                                $scope.serverResults = data;
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

    var gem = {name: "andres"};
})();




