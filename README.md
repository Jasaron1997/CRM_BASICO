graphql-servidor - ttoken
Es un CRM Básico el cual fue diseñado y creado por instructor de Udemy Juan De la Torre (https://www.facebook.com/juan.delatorre.1257), para aquello que deseen poder crear y comprender este proyecto les dejo el link del curso en udemy https://www.udemy.com/course/fullstack-react-graphql-y-apollo-de-principiante-a-experto/?couponCode=GRAPHQLJP10&fbclid=IwAR14i92jSh5bDqM83HC2HyJkneaVDksYT7AHkKAS3sUgzNi7CoKM-sEybTY, pero se le han hecho unas modificaciones  al manejo de los archivos graphql  el mediante "plugins" de ["import-graphql"] lo cual difiere con el proyecto original

El Sistema usa las tecnologias y lenguajes de programación de Reactjs y GraphQL. Incluye Apollo Server y Client, React Apollo, MongoDB y NodeJS.


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
