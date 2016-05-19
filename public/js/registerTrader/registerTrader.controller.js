'use strict';

angular.module('registerTrader')
    .controller('registerTradeController', function ($scope, $auth) {

        $scope.traderName=undefined;
        $scope.traderLastName=undefined;
        $scope.traderEmail=undefined;
        $scope.traderPassword;


        $scope.getSocialMediaInfo = function (provider){
            $auth.authenticate(provider).then(function(response){
                $scope.traderName=response.data.first_name;
                $scope.traderLastName=response.data.last_name;
                $scope.traderEmail=response.data.email;
            }).catch(function(error){
                console.log("hubo un error");
            });
        }

        $scope.registerTraderInfo=function(){
            console.log("presiono en registrarse");
        }
    });
