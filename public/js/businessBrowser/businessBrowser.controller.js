angular.module('businessBrowser', [])
    .controller('businessBrowserController', function ($scope, ResultRetriever, siteAndTownSaverService) {

        setValue();

        $scope.lookForSuggestions = function (typedthings) {
            $scope.newresults = ResultRetriever.getresults(typedthings, "SuggestionsFactory");
            $scope.newresults.then(function (data) {
                $scope.results = data;
            }).catch(function (error) {
                console.log("ocurrio un error", error);
            });
        };

        $scope.keyPressed = function () {
            switch (event.which) {
                case 13:
                    var searchedKeyWord=$scope.result;
                    $scope.doSearch(searchedKeyWord);
                    break;

                case 27:
                    $scope.result = "";
                    break;
            }

            event.preventDefault();
        };

        function setValue() {
            $scope.result = (siteAndTownSaverService.getCurrentSearchedSite() == null) ? undefined : siteAndTownSaverService.getCurrentSearchedSite();
        }
    });

