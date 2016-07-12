'use strict';
angular.module('accountInfo')
    .controller('AccountInfoController', function ($scope, $location,
                                                   authenticationService, navigationService, siteInformationService) {

        $scope.showRequiredFieldMessage = false;
        $scope.usuario = authenticationService.getUser();

        authenticationService.getUserData($scope.usuario.token)
            .success(function (response) {
                $scope.usuario = response;
            });

        $scope.save = function () {
            if ($scope.traderInfoForm.$valid) {

            } else {
                $scope.showRequiredFieldMessage = true;
            }
        }

        $scope.addBusiness = function () {
            navigationService.cameToBusinessInformationThrough='accountinfo';
            $location.path('businessinformation');
        }
        $scope.editSite = function (sitio)  {
            
            siteInformationService.siteId = sitio.id;
            siteInformationService.sitePhoneNumber = sitio.telefono;
            siteInformationService.whatsapp = sitio.whatsapp;
            siteInformationService.web = sitio.web;
            siteInformationService.openingHours = sitio.horariolocal;
            siteInformationService.businessName = sitio.nombre;
            siteInformationService.businessLocation = { lat: parseFloat(sitio.latitud), lng: parseFloat(sitio.longitud)};
            siteInformationService.businessDescription = sitio.descripcion;
            siteInformationService.tags = sitio.tags;
            siteInformationService.businessEmail = sitio.correolocal;
            siteInformationService.businessAddress = sitio.ubicacionlocal;
            siteInformationService.businessCategories = {id: sitio.categorias[0]};
            siteInformationService.URLphotos = sitio.fotos;
            siteInformationService.businessMunicipality = sitio.municipio;

            $location.path('businessinformation');
        }

        $scope.$on('$routeChangeStart', function (scope, next, current) {
            if(next.$$route.controller=='summaryController') {
                $location.path('/accountinfo');
            }
        });
    });
