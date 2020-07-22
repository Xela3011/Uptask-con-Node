const Proyectos = require('../models/Proyectos');
const Tareas = require('../models/Tareas');

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
        await Proyectos.create({ nombre });
        // .then(() => console.log('Insertado correctamente'))
        // .catch(error => console.log(error));
        res.redirect('/');
    }
}

exports.proyectoPorUrl = async (req, res, next) => {
    const proyectosPromise = await Proyectos.findAll();
    const proyectoPromise = await Proyectos.findOne({
        where: {
            url: req.params.url
        }
    })
    const [proyectos, proyecto] = await
        Promise.all([proyectosPromise, proyectoPromise])

    const tareas = await Tareas.findAll(
        {
            where: { proyectoId: proyecto.id }
            //include: [{ model: Proyectos }]
        });

    if (!proyecto) return next();
    res.render('tareas', {
        nombrePagina: 'Tareas del Proyecto',
        proyectos,
        proyecto,
        tareas
    })
}

exports.formularioEditar = async (req, res) => {
    const proyectosPromise = Proyectos.findAll();
    const proyectoPromise = Proyectos.findOne({
        where: {
            id: req.params.id
        }
    })

    const [proyectos, proyecto] = await
        Promise.all([proyectosPromise, proyectoPromise])

    res.render('nuevoProyecto', {
        nombrePagina: 'Editar Proyecto',
        proyectos,
        proyecto
    });
}
exports.actualizarProyecto = async (req, res) => {
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
        await Proyectos.update(
            { nombre: nombre },
            { where: { id: req.params.id } }

        );
        // .then(() => console.log('Insertado correctamente'))
        // .catch(error => console.log(error));
        res.redirect('/');
    }
}
exports.eliminarProyecto = async (req, res, next) => {
    //se puede utilizar query o params para ver lo que trae un req
    //console.log(req.params);
    const { urlProyecto } = req.query;
    console.log(urlProyecto);
    const resultado = await Proyectos.destroy({ where: { url: urlProyecto } });
    if (!resultado) {
        return next();
    }
    res.status(200).send('Proyecto eliminado correctamente');
}