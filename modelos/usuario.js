'use strict';

const mongoose = require ('mongoose');
//const bcrupt = require ('bcrypt-nodejs'); //pora encriptar claves

const Schema = mongoose.Schema;


const UsuarioSchema = Schema({
    nombre: String,
    apellido: String,
    fb_id: String,
    email: {type:String, unique: true, lowercase: true},
    edad: Number,
    sexo: {type: String, enum: ['male', 'female']},
    password: {type: String, select: false},
    signupDate: {type: Date, default: Date.now}
});

//funciones que se ejecutan antes o despues de que el modelo haya sido almacenado en la bdd
//UserSchema.pre('save', (next) => {


//publicamos el modelo para poder ser utilizado en todo el proyecto
module.exports = mongoose.model('Usuario', UsuarioSchema);
