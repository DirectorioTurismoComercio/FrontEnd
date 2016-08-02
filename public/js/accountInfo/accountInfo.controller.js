'use strict';
angular.module('accountInfo')
    .controller('AccountInfoController', function ($scope, $location, $http,
                                                   authenticationService, navigationService, siteInformationService, messageService, filterFilter, API_CONFIG) {

        $scope.showRequiredFieldMessage = false;
        $scope.usuario = authenticationService.getUser();

        authenticationService.getUserData($scope.usuario.token)
            .success(function (response) {
                $scope.usuario = response;
            });

        $scope.save = function () {
            if ($scope.traderInfoForm.$valid && $scope.usuario.newpassword==$scope.usuario.confirmnewpassword) {
                console.log("actualizo con exito");
            } else {
                $scope.showRequiredFieldMessage = true;
            }
        }

        $scope.addBusiness = function () {
            navigationService.cameToBusinessInformationThrough = 'accountinfo';
            siteInformationService.clearData(siteInformationService);
            $location.path('businessinformation');
        }
        $scope.editSite = function (sitio) {
            var siteCategories=[];
            var firstCategory,secondCategory,thirdCategory;
            siteInformationService.siteId = sitio.id;
            siteInformationService.sitePhoneNumber = sitio.telefono;
            siteInformationService.whatsapp = sitio.whatsapp;
            siteInformationService.web = sitio.web;
            siteInformationService.openingHours = sitio.horariolocal;
            siteInformationService.businessName = sitio.nombre;
            siteInformationService.businessLocation = {lat: parseFloat(sitio.latitud), lng: parseFloat(sitio.longitud)};
            siteInformationService.businessDescription = sitio.descripcion;
            siteInformationService.tags = sitio.tags;
            siteInformationService.businessEmail = sitio.correolocal;
            siteInformationService.businessAddress = sitio.ubicacionlocal;
            siteInformationService.businessCategories = {id: sitio.categorias[0]};
            siteInformationService.URLphotos = sitio.fotos;
            siteInformationService.businessMunicipality = sitio.municipio;
            
            firstCategory=filterFilter(sitio.categorias,{tipo:1})[0]
            secondCategory=filterFilter(sitio.categorias,{tipo:2})[0]
            thirdCategory=filterFilter(sitio.categorias,{tipo:3})[0]
            if(firstCategory) siteInformationService.firstCategory = firstCategory.categoria;
            if(secondCategory) siteInformationService.secondCategory = secondCategory.categoria;
            if(thirdCategory) siteInformationService.thirdCategory = thirdCategory.categoria;
            
            for(var i=0;i<sitio.categorias.length;i++){
                siteCategories.push(sitio.categorias[i].categoria);
            }
            
            siteInformationService.businessSubcategories  = {subcategories: siteCategories};
            $location.path('businessinformation');
        }
        $scope.deleteSite = function (sitio) {
            messageService.confirmMessage("¿Está seguro que desea borrar este sitio?", "Borrar sitio", removeSiteFromServer, sitio);

        }
        function removeSiteFromServer(sitio) {
            $http.delete(API_CONFIG.url + "/sitio/detail/" + sitio.id, siteInformationService.formData,
                {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                }).success(function (d) {
                $scope.usuario.sitios.splice($scope.usuario.sitios.indexOf(sitio), 1);
            }).error(function (error) {
                console.log("hubo un error al borrar", error);

            });


        }

        $scope.$on('$routeChangeStart', function (scope, next, current) {
            if (next.$$route.controller == 'summaryController' || next.$$route.controller == 'loginController') {
                $location.path('/home');
            }
        });
    });
