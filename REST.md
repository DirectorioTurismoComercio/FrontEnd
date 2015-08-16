# API Rest de Unal CTC
Unal CTC es una aplicacion que me permite crear match entre aquellos que ofrecen soluciones a quienes publican sus necesidades o problemas relacionados con comercio, turismo y Tics. 

## Metodos HTTP permitidos

|  Método  |              Descripción               |
| -------- | -------------------------------------- |
| `GET`    | Obtener un recurso o lista de recursos |
| `POST`   | Crear un recurso                       |
| `PUT`    | Actualizar un recurso                  |
| `DELETE` | Eliminar un recurso                    |

## Códigos de Respuesta

| Código |                         Descripción                          |
| ------ | ------------------------------------------------------------ |
| `200`  | Success                                                      |
| `201`  | Success - nuevo recurso creado.                              |
| `204`  | Success - no hay contenido para responder                    |
| `400`  | Bad Request - i.e. su solicitud no se pudo evaluar           |
| `401`  | Unauthorized - usuario no esta autenticado para este recurso |
| `404`  | Not Found - recurso no existe                                |
| `422`  | Unprocessable Entity - i.e. errores de validación            |
| `429`  | Limite de uso excedido, intente mas tarde                    |
| `500`  | Error de servidor                                            |
| `503`  | Servicio no disponible                                       |


## URL al servidor
    http://www.epsilondx.com/django/index.fcgi
## Rutas en el servidor

    Using the URLconf defined in turismo.urls, Django tried these URL patterns, in this order:

    ^roles/(?P<pk>[0-9]+)/$
    ^roles/(?P<pk>[0-9]+)/\.(?P<format>[a-z0-9]+)$
    ^roles/
    ^roles/\.(?P<format>[a-z0-9]+)$

    ^usuariosredes/(?P<pk>[0-9]+)
    ^usuariosredes/(?P<pk>[0-9]+)\.(?P<format>[a-z0-9]+)$
    ^usuariosredes
    ^usuariosredes\.(?P<format>[a-z0-9]+)$
    ^usuarios/(?P<usuario>[0-9]+)/problemas_soluciones
    ^usuarios/(?P<usuario>[0-9]+)/problemas_soluciones\.(?P<format>[a-z0-9]+)$

## las redes se guardan como obj JSON y no como arreglo
    ^usuarios/(?P<pk>[0-9]+)/redes
    ^usuarios/(?P<pk>[0-9]+)/redes\.(?P<format>[a-z0-9]+)$
    ^usuarios/(?P<pk>[0-9]+)
    ^usuarios/(?P<pk>[0-9]+)\.(?P<format>[a-z0-9]+)$
    ^usuarios
    ^usuarios\.(?P<format>[a-z0-9]+)$

    ^redes/(?P<pk>[0-9]+)
    ^redes/(?P<pk>[0-9]+)\.(?P<format>[a-z0-9]+)$
    ^redes
    ^redes\.(?P<format>[a-z0-9]+)$

    ^categorias/(?P<pk>[0-9]+)
    ^categorias/(?P<pk>[0-9]+)\.(?P<format>[a-z0-9]+)$
    ^categorias
    ^categorias\.(?P<format>[a-z0-9]+)$

    ^problemas_soluciones/(?P<pk>[0-9]+)
    ^problemas_soluciones/(?P<pk>[0-9]+)\.(?P<format>[a-z0-9]+)$

## Recuperar todos los problemas_soluciones del usuario 1

Hacer get a /usuarios/1/problemas_soluciones
ejemplo de los objetos recuperados:
[
    {
        "id": 1, 
        "titulo": "Tengo un Problema", 
        "descripcion": "Es que...", 
        "fecha": "2015-04-24T03:02:11Z", 
        "tipo": "P", 
        "usuario": 1, 
        "categoria": []
    }
]


## Crear un Problema_solucion para un usuario cuyo id es 1. El campo F puede ser P o S para indicar que es Problema o Solución

Hacer POST a /usuarios/1/problemas_soluciones

    {
        "titulo": "Tengo un Problema", 
        "descripcion": "Es que...", 
        "tipo": "P",  
        "usuario": 1, 
        "categoria": []
    }
## Delete, Patch, Update

ruta: problemas_soluciones/1      donde 1 es el id del problema_solución (ojo, no el id del usuario).
