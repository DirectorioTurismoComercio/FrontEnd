angular.module('businessBrowser', [])
    .controller('businessBrowserController', function ($scope, ResultRetriever, siteAndTownSaverService, $rootScope, $location) {

        setValue();

        $scope.isOnCreationRoute=checkPath();



        console.log("la directiva business browser",$scope);

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
                    var keyWordObject={
                        keyword:searchedKeyWord
                    };
                    $rootScope.$broadcast('businessbrowser::keypressed', keyWordObject);
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

        function checkPath(){
            return $location.path()=='/municipalityroute';
        }
    });

