const mongoose = require('mongoose')
const Schema = mongoose.Schema

const libroSchema = new Schema ({
    titulo: String,
    autor: String,
    precio: Number,
    imagen: String
},{versionkey:false})

module.exports = mongoose.model('books', libroSchema)