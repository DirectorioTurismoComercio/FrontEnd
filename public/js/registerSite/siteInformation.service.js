'use strict';

angular.module('registerSite')
    .factory('siteInformationService', function (authenticationService,$http,API_CONFIG) {
        this.siteId = undefined;
        this.sitePhoneNumber = undefined;
        this.whatsapp = undefined;
        this.web = undefined;
        this.openingHours = undefined;
        this.businessName = undefined;
        this.businessLocation = undefined;
        this.businessDescription = undefined;
        this.tags = undefined;
        this.businessEmail = undefined;
        this.businessAddress = undefined;
        this.businessCategories = undefined;
        this.businessMunicipality = undefined;
        this.mainPhoto = [];
        this.facadePhotos = [];
        this.insidePhotos = [];
        this.productsPhotos = [];
        this.URLphotos = undefined;
        this.businessFirstCategories=undefined;
        this.businessSecondCategories=undefined;
        this.businessThirdCategories=undefined;


        this.buildSiteFormData = function () {
            var fd = new FormData();
     
            fd.append('latitud', this.businessLocation.lat);
            fd.append('longitud', this.businessLocation.lng);
            fd.append('nombre', this.businessName);
            fd.append('descripcion', this.businessDescription);
            fd.append('municipio_id', this.businessMunicipality.id);
            if (this.sitePhoneNumber) fd.append('telefono', this.sitePhoneNumber);
            if (this.openingHours) fd.append('horariolocal', this.openingHours);
            if (this.businessEmail)  fd.append('correolocal', this.businessEmail);
            fd.append('ubicacionlocal', this.businessAddress);
            fd.append('categorias', this.businessCategories.id);
            fd.append('usuario', authenticationService.getUser().id);
            if (this.web) fd.append('web', this.web);
            if (this.whatsapp) fd.append('whatsapp', this.whatsapp);


            try {
                for (var i = 0; i <= this.tags.length - 1; i++) {
                    fd.append('tags', this.tags[i].text);
                }
            } catch (error) {
            }

            appendPhotos(this.mainPhoto, 'fotos_PRINCIPAL', fd);
            appendPhotos(this.facadePhotos, 'fotos_FACHADA', fd);
            appendPhotos(this.insidePhotos, 'fotos_INTERIOR', fd);
            appendPhotos(this.productsPhotos, 'fotos_PRODUCTOS', fd);
            return fd;

        }

        var appendPhotos= function(arrayPhotos, model, fd) {
            var photosCounter = 0;
            angular.forEach(arrayPhotos, function (file) {
                fd.append(model + photosCounter, file.file);
                photosCounter++;
            });
        }


        this.sendSiteDataToServer = function(successFunction, errorFunction) {
            var promise;

            var fd = this.buildSiteFormData();

            
            if(this.siteId){
                promise = $http.put(API_CONFIG.url + API_CONFIG.sitio+"/detail/"+this.siteId, fd,
                {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                });
            }else{
                promise = $http.post(API_CONFIG.url + API_CONFIG.sitio, fd,
                {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                });

            }
            promise.success(successFunction).error(errorFunction);
                
            
            
            
           
        }


        return {

            siteId: this.siteId,
            sitePhoneNumber: this.sitePhoneNumber,
            whatsapp: this.whatsapp,
            web: this.web,
            openingHours: this.openingHours,
            businessName: this.businessName,
            businessLocation: this.businessLocation,
            businessDescription: this.businessDescription,
            tags: this.tags,
            businessEmail: this.businessEmail,
            businessAddress: this.businessAddress,
            businessCategories: this.businessCategories,
            businessMunicipality: this.businessMunicipality,
            mainPhoto: this.mainPhoto,
            facadePhotos: this.facadePhotos,
            insidePhotos: this.insidePhotos,
            productsPhotos: this.productsPhotos,
            URLphotos: this.URLphotos,
            businessFirstCategories:this.businessFirstCategories,
            businessSecondCategories:this.businessSecondCategories,
            businessThirdCategories:this.businessThirdCategories, 
            sendSiteDataToServer: this.sendSiteDataToServer,
            buildSiteFormData: this.buildSiteFormData,
            clearData: function(siteInformationService){
                
                for(var property in this) { 
                    if(this.hasOwnProperty(property) && typeof this[property] != 'function') {
                        this[property]=undefined ; 
                        }
                }
                this.mainPhoto=[];
                this.facadePhotos=[];
                this.insidePhotos=[];
                this.productsPhotos=[];
                
            } 
        };


    });