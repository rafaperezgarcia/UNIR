'use strict';;

const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const FraseSchema = Schema({
  keyword:          //conjunto de palabras que forman parte de la palabra clave
  [
    { word: String }
  ],
  frase:            // conjunto de frases con las que uniRbot contesta
  [
    { cuerpo : String }
  ]
});

//funciones que se ejecutan antes o despues de que el modelo haya sido almacenado en la bdd
//UserSchema.pre('save', (next) => {


//publicamos el modelo para poder ser utilizado en todo el proyecto
module.exports = mongoose.model('fraseDirecta', FraseSchema);
