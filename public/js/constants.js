angular.module('gemStore')
    .constant("Constantes", {
        "url": "http://ecosistema.desarrollo.com:8000",
        "ruta_imagenes": "./images/",
        "app": "C"
    });

angular.module('constants', [])
    .constant("API_CONFIG", {
        "url": "http://ecosistema.desarrollo.com:8000",
        "login": "/rest-auth/login",
        "user": "/usuario",
        "authBaseURL": 'http://ecosistema.desarrollo.com:8000'
    });
