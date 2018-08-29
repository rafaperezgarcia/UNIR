'use strict';

const mongoose = require ('mongoose');
const Schema = mongoose.Schema;


const EstudianteSchema = Schema({
  fb_id:  String,   // identificador facebook
  nombre: String,
  email:  String,
  edad:   Number,
  sexo:   String,
  acceso: Date,     // fecha último acceso
  conversacion:     // conversaciones del estudiante
  [
    {
      fecha: Date,  // fecha de la conversación
      cuerpo:       // conversacion entre bot y estudiante
      [
        {
          bot:  String, // mensaje del bot
          stu:  String  // mensaje estudiante
        }
      ]
    }
  ]
});

//funciones que se ejecutan antes o despues de que el modelo haya sido almacenado en la bdd
//UserSchema.pre('save', (next) => {


//publicamos el modelo para poder ser utilizado en todo el proyecto
module.exports = mongoose.model('estudiante', EstudianteSchema);
