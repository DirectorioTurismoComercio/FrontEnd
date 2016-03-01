(function () {
    angular.module('gemStore')
        .controller('ProfileUpdateController', ['$scope', 'Constantes', 'autenticacionService', 'authenticationService', '$location', 'UserByToken', 'navBar', 'LogoutFactory', 'questionnaireService', 'MunicipiosFactory',
            function ($scope, Constantes, autenticacionService, authenticationService, $location, UserByToken, navBar, LogoutFactory, questionnaireService, MunicipiosFactory) {
                $scope.ruta = Constantes.ruta_imagenes + "botones/";
                $scope.anterior = $scope.ruta + 'boton-regresar.png';
                $scope.usuario = authenticationService.getUser();
                $scope.token = autenticacionService.getInfo();
                console.log($scope.usuario);
                console.log($scope.token);

                MunicipiosFactory.query().$promise.then(function (an) {
                    $scope.municipios = an;
                }).catch(function (error) {
                    console.log(error);
                });

                $scope.muni = function (index) {
                    $scope.usuario.ubicacion_institucion = $scope.municipios[index].nombre;
                    $scope.usuario.municipio_id = $scope.municipios[index];
                }

                $scope.menu_bar = function (view) {
                    questionnaireService.changeView(view);
                }

                $scope.changepass = function () {
                    $location.path('/auth/changepass');
                }

                $scope.update = function () {
                    UserByToken.up(autenticacionService.getInfo()).update(
                        {
                            "nombres": $scope.usuario.nombres,
                            "apellido1": $scope.usuario.apellido1,
                            "apellido2": $scope.usuario.apellido2,
                            "rol": $scope.usuario.rol,
                            "correo": $scope.usuario.correo,
                            "telefono_institucion": $scope.usuario.telefono_institucion,
                            "ubicacion_institucion": $scope.usuario.ubicacion_institucion,
                            "municipio_id": $scope.usuario.municipio_id
                        }).$promise.then(function (response) {
                        autenticacionService.setUser(response);
                        console.log(response);
                    }).catch(function (error) {
                        console.log(error);
                    });

                }
            }
        ]);

})();
