(function () {
    angular.module('gemStore')
        .controller('ProfileUpdateController', ['$scope', 'Constantes', 'authenticationService', '$location', 'UserByToken', 'navBar', 'MunicipiosFactory', '$auth','registroService',
            function ($scope, Constantes, authenticationService, $location, UserByToken, navBar, MunicipiosFactory, $auth, registroService) {
                $scope.ruta = Constantes.ruta_imagenes + "botones/";
                $scope.anterior = $scope.ruta + 'boton-regresar.png';
                $scope.usuario = authenticationService.getUser();
                $scope.token = $scope.usuario.token;
                $scope.isEmailEditable=$auth.getToken()==null;
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
                    registroService.changeView(view);
                }

                $scope.changepass = function () {
                    $location.path('/auth/changepass');
                }

                $scope.update = function () {
                    if($scope.usuario.apellido2==undefined){
                        $scope.usuario.apellido2="";
                    }
                    UserByToken.up($scope.token).update(
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
                        console.log(response);
                    }).catch(function (error) {
                        console.log(error);
                    });

                }
            }
        ]);

})();
