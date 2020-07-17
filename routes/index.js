const express = require("Express");
const router = express.Router();

//importar el controlador
const proyectosController = require("../controllers/proyectosController");

module.exports = function () {
    //ruta para el home
    router.get('/', proyectosController.proyectosHome); // es parte del middleware de express

    router.get('/nosotros', (req, res) => {
        res.render('nosotros')
    })
    return router;
}


