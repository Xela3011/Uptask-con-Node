const express = require("Express");
const router = express.Router();

//importar express validator
const { body } = require('express-validator/check');
//importar el controlador
const proyectosController = require("../controllers/proyectosController");

module.exports = function () {
    //ruta para el home
    router.get('/', proyectosController.proyectosHome); // es parte del middleware de express

    router.get('/nosotros', (req, res) => {
        res.render('nosotros')
    })

    router.get('/nuevo-proyecto', proyectosController.formularioProyecto)
    router.post('/nuevo-proyecto',
        body('nombre').not().isEmpty().trim().escape(),
        proyectosController.nuevoProyecto)

    router.get('/proyectos/:url', proyectosController.proyectoPorUrl);
    router.get('/proyectos/editar/:id',
        proyectosController.formularioEditar);
    router.post('/nuevo-proyecto/:id',
        body('nombre').not().isEmpty().trim().escape(),
        proyectosController.actualizarProyecto)

    router.delete('/proyectos/:url', proyectosController.eliminarProyecto);
    return router;
}


