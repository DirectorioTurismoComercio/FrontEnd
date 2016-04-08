/**
 * UserAdminController Module
 *
 * to redirect to edit user, create problems, complete social networks
 */
angular.module('gemStore')
    .controller('ComoFuncionaController', ['$scope', 'registroService', 'UserFactory', 'Constantes', '$sce',
        function ($scope, registroService, UserFactory, Constantes, $sce) {
            //Inicio Rutas de imagenes
            $scope.ruta = Constantes.ruta_imagenes + "botones/";
            tipo_app = Constantes.app;
            if (tipo_app === 'C') {
                $scope.logo = $scope.ruta + "logo-mercatic.png";
            } else {
                $scope.logo = $scope.ruta + "logo-turistic.png";
            }
            ;
            $scope.config = {
                preload: "none",
                sources: [
                    {
                        src: $sce.trustAsResourceUrl("videos/como_funciona.mp4"), type: "video/mp4"
                    }
                ],
                tracks: [
                    {
                        src: "http://www.videogular.com/assets/subs/pale-blue-dot.vtt",
                        kind: "subtitles",
                        srclang: "en",
                        label: "English",
                        default: ""
                    }
                ],
                theme: {
                    url: "http://www.videogular.com/styles/themes/default/latest/videogular.css"
                }
            };

            $scope.mensaje = "";
            $scope.login = function () {
                registroService.changeView('auth');
            }
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