angular.module('gemStore')
    .constant("Constantes", {
        "url": "http://localhost:9000",
        "ruta_imagenes": "./images/",
        "app": "C"
    });

angular.module('constants', [])
    .constant("API_CONFIG", {
    	"url": "http://127.0.0.1:8000",
    	"login": "/rest-auth/login"
    });