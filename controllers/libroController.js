const Libro = require('../models/Libro');
const path = require('path');
const multer = require('multer');

// Configuración de multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Mostrar
module.exports.mostrar = async (req, res) => {
    try {
        const libros = await Libro.find({});
        console.log(libros);
        res.render('index', {libros}); //Pasar libros a la vista index
    } catch (error) {
        res.status(500).json({
            message: 'Error mostrando los libros',
            error: error.message
        });
    }
};

// Crear libro con imagen
module.exports.crear = (req, res) => {
    upload.single('imagen')(req, res, async function (err) {
        if (err) {
            return res.status(500).json({
                message: 'Error al subir la imagen',
                error: err.message
            });
        }

        try {
            const libro = new Libro({
                titulo: req.body.titulo,
                autor: req.body.autor,
                precio: req.body.precio,
                imagen: req.file ? `/images/${req.file.filename}` : '' // Guardar la URL de la imagen
            });
            await libro.save();
            res.redirect('/'); // Redireccionar a la página principal después de crear el libro
        } catch (error) {
            res.status(500).json({
                message: 'Error al crear libro',
                error: error.message
            });
        }
    });
};

// Editar
module.exports.editar = (req, res) => {
    upload.single('imagen')(req, res, async function (err) {
        if (err) {
            return res.status(500).json({
                message: 'Error al subir la imagen',
                error: err.message
            });
        }

        const { id_editar, titulo_editar, autor_editar, precio_editar } = req.body;

        try {
            const updateData = {
                titulo: titulo_editar,
                autor: autor_editar,
                precio: precio_editar
            };

            // Si se subió una nueva imagen, actualizar el campo 'imagen'
            if (req.file) {
                updateData.imagen = `/images/${req.file.filename}`;
            }

            await Libro.findByIdAndUpdate(id_editar, updateData);
            res.redirect('/');  // Redireccionar a la página principal después de editar el libro
        } catch (error) {
            res.status(500).json({
                message: 'Error actualizando el libro',
                error: error.message
            });
        }
    });
};

// Eliminar
module.exports.eliminar = async (req, res) => {
    const { id } = req.params;

    try {
        await Libro.findByIdAndDelete(id);
        res.redirect('/');  // Redireccionar a la página principal después de borrar el libro
    } catch (error) {
        res.status(500).json({
            message: 'Error borrando el libro',
            error: error.message
        });
    }
};