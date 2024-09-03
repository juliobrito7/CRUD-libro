const express = require('express');
const app = express()

const db = require('./db')

app.set('view engine', 'ejs')

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(express.static('public'))

const libros = require('./routes/libros')
app.use(libros)

// Manejar la ruta principal
app.get('/', (req, res) => {
    res.redirect('/'); // Asegúrate de que la ruta redirija a la vista de libros
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal!');
});

app.listen(3000, ()=>{
    console.log('¡Server Up! en http://localhost:3000')
})
