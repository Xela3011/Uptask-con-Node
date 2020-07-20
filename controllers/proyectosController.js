const Proyectos = require('../models/Proyectos');

exports.proyectosHome = (req, res) => {
    res.render("index",
        {
            nombrePagina: 'Proyectos'
        });
}

exports.formularioProyecto = (req, res) => {
    res.render('nuevoProyecto', {
        nombrePagina: 'Nuevo Proyecto'
    })
}

exports.nuevoProyecto = async (req, res) => {
    //Enviar a la consola lo que el cliente escriba
    //console.log(req.body);

    //validar que tengamos algo en el input
    //destructuring in JS
    const { nombre } = req.body;

    let errores = [];
    if (!nombre) {
        errores.push({ "texto": "El Nombre del proyecto es obligatorio" });
    }
    // si hay errores
    if (errores.length > 0) {
        res.render('nuevoProyecto', {
            nombrePagina: 'Nuevo Proyecto',
            errores
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