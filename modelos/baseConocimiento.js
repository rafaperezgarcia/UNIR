'use strict';

const mongoose = require ('mongoose');
const Schema = mongoose.Schema;


const BaseSchema = Schema({
  intencion:  String,   // intención detectada por uniRbot
  frase:      String,   // frase que muestra uniRbot para esta intención
  recurso:              // conjunto de recursos para esta intención
  [
    { item : String }
  ]
});

//funciones que se ejecutan antes o despues de que el modelo haya sido almacenado en la bdd
//UserSchema.pre('save', (next) => {


//publicamos el modelo para poder ser utilizado en todo el proyecto
module.exports = mongoose.model('baseConocimiento', BaseSchema);
