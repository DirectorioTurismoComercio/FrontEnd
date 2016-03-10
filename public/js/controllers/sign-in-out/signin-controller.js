angular.module('gemStore')
    .controller('SigninController', ['$scope', 'registroService', 'UserFactory', 'Constantes',
        function ($scope, registroService, UserFactory, Constantes) {
            //Inicio Rutas de imagenes
            $scope.ruta = Constantes.ruta_imagenes + "botones/";
            tipo_app = Constantes.app;
            if (tipo_app === 'C') {
                $scope.logo = $scope.ruta + "logo-mercatic.png";
            } else {
                $scope.logo = $scope.ruta + "logo-turistic.png";
            }
            ;
            $scope.mensaje = "";

            $scope.signin = function (user) {
                usuario = registroService.getUsuario();
                console.log(usuario);
                UserFactory.get({id: user}).$promise
                    .then(function (user) {
                        registroService.setUsuario(user);
                        console.log(registroService.getUsuario());
                        registroService.changeView('personalData');

                    }).catch(function (errors) {
                    $scope.mensaje = "No se encontró al usuario";
                }).finally(function () {

                });
            }
        }]);