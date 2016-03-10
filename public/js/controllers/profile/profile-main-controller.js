(function () {
    angular.module('gemStore')
        .controller('ProfileMainController', ['$scope', 'Constantes', '$location', 'questionnaireService', 'navBar', '$mdToast', 'LogoutFactory', 'authenticationService', 'solutionService', 'RoleFactory',
            function ($scope, Constantes, $location, questionnaireService, navBar, $mdToast, LogoutFactory, authenticationService, solutionService, RoleFactory) {
                $scope.usuario = authenticationService.getUser();
                $scope.rol = $scope.usuario.rol;
                questionnaireService.setRol($scope.rol);

                RoleFactory.get({'id': $scope.rol}).$promise
                    .then(function (inforol) {
                        questionnaireService.setImgRol(inforol.imagen);
                        $scope.img_rol = Constantes.ruta_imagenes + '/' + questionnaireService.getImgRol();

                        if (inforol.tipo_rol === 'BC' || inforol.tipo_rol === 'BC') {
                            questionnaireService.setTipo('P');
                        } else {
                            questionnaireService.setTipo('S');
                        }
                        ;
                    }).catch(function (errors) {
                    console.log("Error al recuperar los roles desde el servidor: ", errors);
                }).finally(function () {

                });

                solutionService.setLogged('NOT');

                $scope.menu_bar = function (view) {
                    questionnaireService.changeView(view);
                }
            }
        ]);
})();