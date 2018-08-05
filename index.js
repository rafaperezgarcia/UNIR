'use strict';

const unirbot = require('./app');
const entorno = require('./variables/entorno');
const mongoose = require('mongoose');



//conexión con la base de datos
mongoose.connect(entorno.bd, (err, res) => {
  if (err)
    console.log(`Error al conectar con la Base de Datos: ${err}`);
  else {
    console.log('Conexión a la Base de Datos establecida ...');
    //arrancamos el bot
    unirbot.start();
  };
});
