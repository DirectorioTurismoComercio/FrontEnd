/**
* UserAdminController Module
*
* to redirect to edit user, create problems, complete social networks
*/
angular.module('gemStore')
.controller('ComoFuncionaController', ['$scope', 'registroService', 'UserFactory', 'Constantes',
        function($scope,registroService,UserFactory, Constantes){
        //Inicio Rutas de imagenes
        $scope.ruta= Constantes.ruta_imagenes + "botones/";    
        tipo_app = Constantes.app;
        if (tipo_app === 'C') {
            $scope.logo= $scope.ruta + "logo-mercatic.png";    
        } else{
            $scope.logo= $scope.ruta + "logo-turistic.png";      
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
        $scope.vervideo = function(){
            //IR A NUEVA VISTA
            registroService.changeView('como_funciona');
        }

        $scope.signup = function()
        {
            registroService.changeView('roles');
        }

        // Función para no registrado (Comienza a Explorar) 
        $scope.noregistrado = function()
        {
            registroService.changeView('actionquestionnaire');
        }
	
}]);