var objeto = {
        "url": "http://innovamarca.com.co/servicio2",
        "login": "/rest-auth/login/",
        "logout": "/rest-auth/logout/",
        "user": "/rest-auth/registration/",
        "user_detail": "/rest-auth/user/",
        "sitios":"/ruta/sitios",
        "sitio":"/sitio",
        "categorias":"/categorias",
        "getTownOnMapClickURL":'http://maps.googleapis.com/maps/api/geocode/json?latlng='
    }




angular.module('constants', [])
    .constant("API_CONFIG", objeto);
