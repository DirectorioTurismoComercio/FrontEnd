angular.module('businessBrowser', [])
    .controller('businessBrowserController', function ($scope, ResultRetriever, siteAndTownSaverService) {

        setPlaceholderAndValue();


        $scope.lookForSuggestions = function (typedthings) {
            $scope.newresults = ResultRetriever.getresults(typedthings, "SuggestionsFactory");
            $scope.newresults.then(function (data) {
                $scope.results = data;
            }).catch(function (error) {
                console.log("ocurrio un error", error);
            });
        }

        function setPlaceholderAndValue() {
            $scope.browserBusinessPlaceholder = (siteAndTownSaverService.getCurrentSearchedSite() == null) ? '¿Qué Buscas?' : siteAndTownSaverService.getCurrentSearchedSite();
            $scope.result= (siteAndTownSaverService.getCurrentSearchedSite() == null) ? undefined : siteAndTownSaverService.getCurrentSearchedSite();
        }
    });

