(function () {
    angular.module('gemStore')
        .controller('ProfileMainController', ['$scope', 'Constantes', '$location', 'navBar', '$mdToast', 'authenticationService','registroService',
            function ($scope, Constantes, $location, navBar, $mdToast, authenticationService, registroService) {
                $scope.usuario = authenticationService.getUser();




                $scope.menu_bar = function (view) {
                    registroService.changeView(view)
                }
            }
        ]);
})();