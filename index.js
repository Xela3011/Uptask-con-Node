const express = require('express');
const routes = require('./routes');
const path = require('path');
//path es una librería nativa de node leer el filesystem (archivos de las carpetas de mi
//proyecto), una forma de acceder a ellos
//crear una app de express #Es como un servidor

const app = express();

//donde cargar archivos estáticos
//se usa como argumento el nombre de la carpeta que contiene
//los archivos
app.use(express.static('public'))
//Habilitar pug
app.set('view engine', 'pug');
//Añadir la carpeta de las vistas
app.set('views', path.join(__dirname, './views'))
//podemos decir que los Middleware son funciones que se ejecutan una tras otra
//no importa la diágonal que pongas en .use, tomará las rutas de la función routes
app.use('/', routes());

//Definir qué puerto se quiere escuchar para las peticiones
app.listen(3000)

