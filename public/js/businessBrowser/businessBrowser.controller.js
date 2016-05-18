angular.module('businessBrowser', [])
    .controller('businessBrowserController', function ($scope, ResultRetriever, siteAndTownSaverService) {

        setValue();

        $scope.lookForSuggestions = function (typedthings) {
            console.log("entro a sugerencias");
            $scope.newresults = ResultRetriever.getresults(typedthings, "SuggestionsFactory");
            $scope.newresults.then(function (data) {
                $scope.results = data;
            }).catch(function (error) {
                console.log("ocurrio un error", error);
            });
        }

        function setValue() {
            $scope.result= (siteAndTownSaverService.getCurrentSearchedSite() == null) ? undefined : siteAndTownSaverService.getCurrentSearchedSite();
        }
    });

