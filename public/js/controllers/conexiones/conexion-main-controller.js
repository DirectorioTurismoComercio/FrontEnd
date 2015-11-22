angular.module('gemStore')
.controller('ConexionMainController', ['$scope','Constantes','$location','navBar','autenticacionService','$mdToast','conexionService','ConexionFactory','ConexionMensajeFactory',
	function($scope,Constantes,$location,navBar,autenticacionService,$mdToast,conexionService,ConexionFactory,ConexionMensajeFactory){
        var origen = conexionService.getOrigen();
        var load = true;
        if (origen === 'detalle') {
            var id_busqueda = conexionService.getBusqueda();
            $scope.solucion = conexionService.getSolucion();
            var id_solucion = $scope.solucion.problema_solucion.id;
            
        } else{
            var id_busqueda = conexionService.getBusqueda();
            $scope.solucion = conexionService.getSolucion();            
            var id_solucion = $scope.solucion;
        };
        console.log("id_b:",id_busqueda);
        console.log("id_s:",id_solucion);

        var usuario = autenticacionService.getUser();        
        console.log(usuario);

        // actualizar();

        // var actualizar = function(){
          ConexionFactory.get({"id_b": id_busqueda,"id_s": id_solucion}).$promise.then(function(resultado){                                            
            console.log(resultado);    
            var busc = resultado.busqueda.usuario;
            var resp = resultado.respuesta.usuario;
            for (var i = 0; i <= resultado.mensajes.length - 1; i++) {
                if (resultado.mensajes[i].destinatario === autenticacionService.getUser().id) {
                    resultado.mensajes[i].clase = 'mensaje_recibido';
                } else{
                    resultado.mensajes[i].clase = 'mensaje_enviado';
                };
            };
            $scope.mensajes = resultado.mensajes;
            console.log($scope.mensajes);
            var remite = autenticacionService.getUser().id;                
            var dest = null;
            if (remite === busc) {
                dest = resp;
            } else{
                dest = busc;
            };
            var load = false;
        }).catch(function(error){
            console.log(error);
        });
  
        // }
        // ConexionFactory.get({"id_b": id_busqueda,"id_s": id_solucion}).$promise.then(function(resultado){                                            
        //     console.log(resultado);    
        //     var busc = resultado.busqueda.usuario;
        //     var resp = resultado.respuesta.usuario;
        //     for (var i = 0; i <= resultado.mensajes.length - 1; i++) {
        //         if (resultado.mensajes[i].destinatario === autenticacionService.getUser().id) {
        //             resultado.mensajes[i].clase = 'mensaje_recibido';
        //         } else{
        //             resultado.mensajes[i].clase = 'mensaje_enviado';
        //         };
        //     };
        //     $scope.mensajes = resultado.mensajes;
        //     console.log($scope.mensajes);
        //     var remite = autenticacionService.getUser().id;                
        //     var dest = null;
        //     if (remite === busc) {
        //         dest = resp;
        //     } else{
        //         dest = busc;
        //     };
        //     var load = false;
        // }).catch(function(error){
        //     console.log(error);
        // });

        $scope.toggleRight = function(){                                
          navBar.open();
        }

        $scope.close= function(){
          navBar.close();
        }

        $scope.menu_bar = function (view){          
            $location.path(view);  
        }

        $scope.enviar = function(){
            ConexionFactory.get({"id_b": id_busqueda,"id_s": id_solucion}).$promise.then(function(resultado){                                            
                console.log(resultado);    
                var busc = resultado.busqueda.usuario;
                var resp = resultado.respuesta.usuario;
                var remite = autenticacionService.getUser().id;                
                var dest = null;
                if (remite === busc) {
                    dest = resp;
                } else{
                    dest = busc;
                };
                ConexionMensajeFactory.save({"mensaje": $scope.mensaje.mensaje, "usuario_busqueda": busc, "usuario_respuesta": resp, "conversacion": resultado.id, "destinatario": dest}).$promise.then(function(res_mensaje){
                    console.log("respuesta mensaje",res_mensaje);
                }).catch(function(err){                    
                    console.log(err);
                });
            }).catch(function(error){
                console.log(error);
            });
            // actualizar();
        }


}]);