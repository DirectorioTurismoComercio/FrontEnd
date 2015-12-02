/**
* UserAdminController Module
*
* to redirect to edit user, create problems, complete social networks
*/
angular.module('gemStore')
.controller('ComoFuncionaController', ['$scope', 'registroService', 'UserFactory', 'Constantes','$sce',
        function($scope,registroService,UserFactory, Constantes,$sce){
        //Inicio Rutas de imagenes
        $scope.ruta= Constantes.ruta_imagenes + "botones/";    
        tipo_app = Constantes.app;
        if (tipo_app === 'C') {
            $scope.logo= $scope.ruta + "logo-mercatic.png";    
        } else{
            $scope.logo= $scope.ruta + "logo-turistic.png";      
        };        
        $scope.config = {
            preload: "none",
            sources: [
                {src: $sce.trustAsResourceUrl("videos/como_funciona.mp4"), type: "video/mp4"}
                // {src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.webm"), type: "video/webm"},
                // {src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.ogg"), type: "video/ogg"}
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

        $scope.iniciar_sesion= $scope.ruta + "boton_iniciar_sesion.png";    
        $scope.registro= $scope.ruta + "boton_registrate.png";    
        $scope.comenzar= $scope.ruta + "icono-comenzar.png";    
        $scope.como_funciona= $scope.ruta + "boton_como_funciona.png";    
        //Fin Rutas de imagenes
        $scope.mensaje="";
        $scope.login=function(){
            registroService.changeView('auth');
        }
        $scope.signin=function(user)
        {	
            usuario = registroService.getUsuario();
			console.log(usuario);
            UserFactory.get({id:user}).$promise
            .then(function(user){
                registroService.setUsuario(user);
                console.log(registroService.getUsuario());
                registroService.changeView('personalData');
           	
            }).catch(function(errors){
                $scope.mensaje="No se encontró al usuario";
            }).finally(function(){
                
                
            });

        }	
        

        $scope.signup = function()
        {
            registroService.changeView('signin');
        }

        // Función para no registrado (Comienza a Explorar) 
        $scope.noregistrado = function()
        {
            registroService.changeView('actionquestionnaire');
        }
	
}]);