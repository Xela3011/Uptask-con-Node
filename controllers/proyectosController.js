const Proyectos = require('../models/Proyectos');


exports.proyectosHome = async (req, res) => {
    const proyectos = await Proyectos.findAll();
    res.render("index",
        {
            nombrePagina: 'Proyectos',
            proyectos
        });
}

exports.formularioProyecto = async (req, res) => {
    const proyectos = await Proyectos.findAll();
    res.render('nuevoProyecto', {
        nombrePagina: 'Nuevo Proyecto',
        proyectos
    })
}

exports.nuevoProyecto = async (req, res) => {
    //Enviar a la consola lo que el cliente escriba
    //console.log(req.body);

    //validar que tengamos algo en el input
    //destructuring in JS
    //const { nombre } = req.body;
    const nombre = req.body.nombre;

    let errores = [];
    if (!nombre) {
        errores.push({ "texto": "El Nombre del proyecto es obligatorio" });
    }
    // si hay errores
    if (errores.length > 0) {
        const proyectos = await Proyectos.findAll();
        res.render('nuevoProyecto', {
            nombrePagina: 'Nuevo Proyecto',
            errores,
            proyectos
        })
    } else {
        //no hay errores
        //Insertar en la BD
        const proyecto = await Proyectos.create({ nombre });
        // .then(() => console.log('Insertado correctamente'))
        // .catch(error => console.log(error));
        res.redirect('/');
    }
}

exports.proyectoPorUrl = async (req, res, next) => {
    const proyectos = await Proyectos.findAll();
    const proyecto = await Proyectos.findOne({
        where: {
            url: req.params.url
        }
    })

    if (!proyecto) return next();
    res.render('tareas', {
        nombrePagina: 'Tareas del Proyecto',
        proyectos,
        proyecto
    })
}