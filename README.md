graphql-servidor - ttoken


Para acceder por primera vez deben de abrir la terminar de mongo y ejecutar este comando 

use clientes;

Usuario:ADMIN

Contraseña:Manag3r!

db.usuarios.insertMany([
{ 
    "_id" : ObjectId("5d55a59b61bfd84c48c5984d"), 
    "usuario" : "ADMIN", 
    "nombre" : "Administrador del CRM", 
    "password" : "$2b$10$HjzxpbLNMnI1M7/yf.pZee6SvVv7Hsl6aCu8cChfBAKNCHNiyDivC", 
    "rol" : "ADMINISTRADOR", 
    "__v" : NumberInt(0)
},
{ 
    "_id" : ObjectId("5d55ae8f61bfd84c48c59853"), 
    "usuario" : "VENDEDOR", 
    "nombre" : "VENDEDOR TEST", 
    "password" : "$2b$10$g3N12J80ibtvP9ODrM1oD.Zxxh7h43tyWkZEA19luf8EO3dBmG7xa", 
    "rol" : "VENDEDOR", 
    "__v" : NumberInt(0)
},
{ 
    "_id" : ObjectId("5d55afcc61bfd84c48c59858"), 
    "usuario" : "VENDEDOR2", 
    "nombre" : "VENDEDOR TEST2", 
    "password" : "$2b$10$ZKnJ1KS8Gfesu2Unzj8WYO28PekpW0B4nt4lV5hAaRyWsQ.ixb2By", 
    "rol" : "VENDEDOR", 
    "__v" : NumberInt(0)
}
]);
