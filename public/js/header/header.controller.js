angular.module('ecosistemaHeader',[])
    .controller('ecosistemaHeaderController', function ($scope, $translate) {
        $scope.changeLanguage=function(language){
            console.log("Presiono en traducri");
            $translate.use(language);
        }
    });