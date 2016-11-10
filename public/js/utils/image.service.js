'use strict';

angular.module('utils')
    .service('ImageService', function ($q, $window, filterFilter) {
        var MAX_IMAGE_WIDTH = 1200;
        var MAX_IMAGE_HEIGHT = 1200;

        function reduceImageSize(file, imageQuality, photoLoading, $scope) {
            if (!(file instanceof File)) {
                changeLoadingState(photoLoading, false, $scope);
                throw "file param must be of File type";
            }

            var defer = $q.defer();
            var reader = new FileReader();
            var image = new Image();

            image.onload = function () {
                var newSize = scaleImageSize(image, MAX_IMAGE_WIDTH, MAX_IMAGE_HEIGHT);
                var base64ReducedImage = reduceQuality(image, file.type, imageQuality, newSize);
                defer.resolve(base64ReducedImage);
            };

            reader.onload = function () {
                image.src = window.URL.createObjectURL(file);
                window.URL.revokeObjectURL(file);
            };

            reader.readAsDataURL(file);

            return defer.promise;
        }

        function reduceQuality(image, mimeType, quality, newSize) {
            if (!(image instanceof Image)) {
                throw "image param must be of Image type";
            }

            var canvas = document.createElement('canvas');

            if (newSize) {
                canvas.width = newSize.width;
                canvas.height = newSize.height;
            } else {
                canvas.width = image.naturalWidth;
                canvas.height = image.naturalHeight;
            }

            canvas.getContext("2d").drawImage(image, 0, 0, newSize.width, newSize.height);
            return canvas.toDataURL(mimeType, quality);
        }


        function scaleImageSize(imageSize, maxWidth, maxHeight) {
            var height = imageSize.height;
            var width = imageSize.width;
            var ratio = height / width;

            if (width >= maxWidth && ratio <= 1) {
                width = maxWidth;
                height = width * ratio;
            } else if (height >= maxHeight) {
                height = maxHeight;
                width = height / ratio;
            }

            return {
                width: width,
                height: height
            }
        }

        function rotateImage(orientation, base64Image) {
            var defer = $q.defer();
            var base64RotatedImage = base64Image;

            if (orientation) {
                var canvas = document.createElement("canvas");
                var ctx = canvas.getContext('2d');
                var thisImage = new Image();
                thisImage.onload = function () {
                    canvas.width = thisImage.width;
                    canvas.height = thisImage.height;
                    ctx.save();
                    var width = canvas.width;
                    var styleWidth = canvas.style.width;
                    var height = canvas.height;
                    var styleHeight = canvas.style.height;

                    if (orientation > 4) {
                        canvas.width = height;
                        canvas.style.width = styleHeight;
                        canvas.height = width;
                        canvas.style.height = styleWidth;
                    }
                    switch (orientation) {
                        case 2:
                            ctx.translate(width, 0);
                            ctx.scale(-1, 1);
                            break;
                        case 3:
                            ctx.translate(width, height);
                            ctx.rotate(Math.PI);
                            break;
                        case 4:
                            ctx.translate(0, height);
                            ctx.scale(1, -1);
                            break;
                        case 5:
                            ctx.rotate(0.5 * Math.PI);
                            ctx.scale(1, -1);
                            break;
                        case 6:
                            ctx.rotate(0.5 * Math.PI);
                            ctx.translate(0, -height);
                            break;
                        case 7:
                            ctx.rotate(0.5 * Math.PI);
                            ctx.translate(width, -height);
                            ctx.scale(-1, 1);
                            break;
                        case 8:
                            ctx.rotate(-0.5 * Math.PI);
                            ctx.translate(-width, 0);
                            break;
                    }

                    ctx.drawImage(thisImage, 0, 0);
                    ctx.restore();
                    base64RotatedImage = canvas.toDataURL();
                    defer.resolve(base64RotatedImage);
                }
                thisImage.src = base64Image;
            } else {
                defer.resolve(base64RotatedImage);
            }

            return defer.promise;
        }

        function dataURIToBlob(dataURL, name) {
            var blob;
            var BASE64_MARKER = ';base64,';
            if (dataURL.indexOf(BASE64_MARKER) == -1) {
                var parts = dataURL.split(',');
                var contentType = parts[0].split(':')[1];
                var raw = decodeURIComponent(parts[1]);

                return new Blob([raw], {type: contentType});
            }

            var parts = dataURL.split(BASE64_MARKER);
            var contentType = parts[0].split(':')[1];
            var raw = window.atob(parts[1]);
            var rawLength = raw.length;

            var uInt8Array = new Uint8Array(rawLength);

            for (var i = 0; i < rawLength; ++i) {
                uInt8Array[i] = raw.charCodeAt(i);
            }

            blob = new Blob([uInt8Array], {type: contentType});
            blob.name = name;
            blob.lastModifiedDate = new Date();

            return blob;
        }

        function changeLoadingState(photoLoading, state,$scope) {
            switch (photoLoading) {
                case 'mainPhoto':
                    $scope.loadingMainPhoto = state;
                    break;
                case 'facadePhotos':
                    $scope.loadingFacadePhoto = state;
                    break;

                case 'insidePhotos':
                    $scope.loadingInsidePhoto = state;
                    break;

                case 'productsPhotos':
                    $scope.loadingProductsPhoto = state;
                    break;
            }
        }

        function getMainMunicipalityImage(municipality){
            return filterFilter(municipality.fotos,{tipo:'P'})[0].URLfoto;
        }



        return {
            reduceImageSize: reduceImageSize,
            rotateImage: rotateImage,
            dataURIToBlob: dataURIToBlob,
            changeLoadingState:changeLoadingState,
            getMainMunicipalityImage:getMainMunicipalityImage
        }
    });