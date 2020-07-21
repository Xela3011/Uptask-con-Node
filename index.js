const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');
//const expressValidator = require('express-validator');
//path es una librería nativa de node leer el filesystem (archivos de las carpetas de mi
//proyecto), una forma de acceder a ellos

const helpers = require('./helpers');
//crear la conexión a la DB
const db = require('./config/db');

//importar el modelo
require('./models/Proyectos');
require('./models/Tareas');
db.sync()
    .then(() => console.log('Connected to server'))
    .catch(error => console.log(error));
//crear una app de express #Es como un servidor

const app = express();
//agregar express validator a la app
//app.use(expressValidator());
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

//pasar helpers
app.use((req, res, next) => {
    res.locals.vardump = helpers.vardump;
    res.locals.year = 2020;
    next();
});
//habilitar bodyParser para leer datos del formulario
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// aqui mi ruta
app.use('/', routes());

//Definir qué puerto se quiere escuchar para las peticiones
app.listen(3000)

