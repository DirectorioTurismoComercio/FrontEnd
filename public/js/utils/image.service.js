'use strict';

angular.module('utils')
    .service('ImageService', function ($q, $window) {
        const MAX_IMAGE_WIDTH = 800;
        const MAX_IMAGE_HEIGHT = 800;
        const IMAGE_QUALITY = 0.3;

        function reduceImageSize(file) {
            if (!(file instanceof File)) {
                throw "file param must be of File type";
            }

            var defer = $q.defer();
            var reader = new FileReader();
            var image = new Image();

            image.onload = function () {
                var newSize = scaleImageSize(image, MAX_IMAGE_WIDTH, MAX_IMAGE_HEIGHT);
                var base64ReducedImage = reduceQuality(image, file.type, IMAGE_QUALITY, newSize);
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

        function rotateImage(photoLoading, orientation, base64Image) {
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
            }

            return defer.promise;
        }


        return {
            reduceImageSize: reduceImageSize,
            rotateImage: rotateImage
        }
    });