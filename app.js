'use strict';

const BootBot = require('bootbot');
const config = require('config');
const entorno = require('./variables/entorno');


const Usuario = require('./modelos/usuario');

//crea la instancia de unirbot y la exporta para poder ser utilizada en otro módulo
const unirbot = new BootBot({
  accessToken: entorno.accessToken,
  verifyToken: entorno.verifyToken,
  appSecret: entorno.appSecret
});
module.exports = unirbot;

// texto de bienvenida del bot
unirbot.setGreetingText(config.get('presentacion'));
unirbot.setGetStartedButton((payload, chat) => {
  chat.say(config.get('bienvenida'));
});
unirbot.setPersistentMenu([
  {
    type: 'postback',
    title: 'Soy Alumno de UNIR',
    payload: 'ALUMNO_ACTUAL'
  },
  {
    type: 'postback',
    title: 'No soy Alumno de UNIR',
    payload: 'ALUMNO_NUEVO'
  },
  {
    type: 'web_url',
    title: 'Pagina Web UNIR',
    url: 'https://www.unir.net/'
  }
]);

unirbot.on('postback:ALUMNO_ACTUAL', (payload, chat) => {
  chat.say(`Conversación dirigida a un Alumno`);
});

unirbot.on('postback:ALUMNO_NUEVO', (payload, chat) => {
  chat.say(`Conversación dirigida para un Alumno Nuevo`);
});


//palabras clave SALUDO
unirbot.hear(config.get('saluda'), (payload, chat) => {
    chat.getUserProfile().then((user) => {
    chat.say(`Hola ${user.first_name}, en que te puedo ayudar?`);
  });
});

//palabras clave DESPEDIDA
unirbot.hear(config.get('despedida'), (payload, chat) => {
  chat.say("Espero haberte servido de ayuda, por aquí sigo si me necesitas ;)");
  chat.getUserProfile().then((user) => {
    chat.say(`Adios ${user.first_name}!`);
  });
});

/*
// *** acceso a Base de Datos ***
//*******************************
unirbot.hear(['bdd'], (payload, chat) => {
    // guardar en base de datos
    let usuario = new Usuario();

    chat.getUserProfile().then((user) => {
      usuario.nombre = user.first_name,
      usuario.apellido = user.last_name,
      usuario.fb_id = user.id,
      usuario.email = 'rafa@dipucuenca.es',
      usuario.edad = 10,
      usuario.sexo = user.gender,
      usuario.password = '',
      usuario.signupDate = Date.now
    });

    usuario.save((err, usuarioID) => {
        if (err)
          chat.say(`Error al guardar en Base de Datos ${err}`);
        else
          console.log(usuario);
          chat.say(`Usuario Almacenado ${usuarioID}`);
        });
});
*/
// respuestas rápidas
unirbot.hear(config.get('ayuda'), (payload, chat) => {
    // Send a text message with quick replies
    chat.say({
        text: config.get('agente'),
        quickReplies: ['SI', 'NO']
    });
//    unirbot.on('quick_reply', (payload, chat) => {
//        chat.say({
//            type: 'web_url',
//            url: 'https://www.unir.net'
//      });
//    });
});



//Ejemplo de Echo del bot
//unirbot.on('message', (payload, chat) => {
//  const text = payload.message.text;
  //chat.say(`Echo: ${text}`);
//});



// unirbot.on('quick_reply', (payload, chat)=>{
//    let answer = payload.message.text;
//    chat.say(`Quick Reply -> ${answer}`);
//
//});

// Catch attachments
unirbot.on('attachment', (payload, chat) => {
    // Send a GIF as an answer
    chat.say({
        attachment: 'image',
        url: 'https://media.giphy.com/media/3oKIPxdXTlkFNAkTe0/giphy.gif'
    });

});


unirbot.hear("Prueba", (payload, chat) => {
  chat.say('Estás en el sitio adecuado, te voy a enseñar que es UNIR');
  var elements= [
		{ title: 'Artile 1', image_url: 'https://mexico.unir.net/wp-content/uploads/2016/10/UDUAL.jpg'},
		{ title: 'Artile 2', image_url: 'https://mexico.unir.net/wp-content/uploads/2016/10/UDUAL.jpg',
            default_action: {
              "type": "web_url",
              "url": "https://www.unir.net/",
              "messenger_extensions": true,
              "webview_height_ratio": "tall",
              "fallback_url": "https://www.unir.net/"
            }
      }
	];
  var buttons = [
		{ type: 'postback', title: 'View More', payload: 'VIEW_MORE' }
	]
  chat.sendListTemplate(elements, buttons);

  chat.say({
	elements: [
		{ title: 'Artile 1', image_url: 'https://mexico.unir.net/wp-content/uploads/2016/10/UDUAL.jpg', default_action: {} },
		{ title: 'Artile 2', image_url: 'https://mexico.unir.net/wp-content/uploads/2016/10/UDUAL.jpg', default_action: {} }
	],
	buttons: [
		{ type: 'postback', title: 'View More', payload: 'VIEW_MORE' }
	]
});

});

// Send Generic Templates
unirbot.hear(config.get('unir'), (payload, chat) => {
    chat.say({
        elements: [
            {
                title: 'UNIR',
                image_url: 'https://www.unir.net/wp-content/uploads/2018/07/trabajar-y-estudiar-1-1-700x360.jpg',
                default_action: {
                  "type": "web_url",
                  "url": "https://www.youtube.com/watch?v=JNvVyW-xpTM&list=PLFCF11210161ABC79"
                }
            },
            {
                title: 'Vive UNIR',
                image_url: 'https://i.ytimg.com/vi/JNvVyW-xpTM/hqdefault.jpg?sqp=-oaymwEYCKgBEF5IVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLBx81uzd5S2xEf8KvInE4MhLXpU9A',
                default_action: {
                    "type": "web_url",
                    "url": "https://www.youtube.com/watch?v=JNvVyW-xpTM&list=PLFCF11210161ABC79"
                }
            },
            {
                title: 'Metodología',
                image_url: 'https://i.ytimg.com/vi/JNvVyW-xpTM/hqdefault.jpg?sqp=-oaymwEYCKgBEF5IVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLBx81uzd5S2xEf8KvInE4MhLXpU9A',
                default_action: {
                    "type": "web_url",
                    "url": "https://www.youtube.com/watch?v=cqCGu2RPmGk&list=PLFCF11210161ABC79&index=2"
                }
            },
            {
                title: 'Pedagogía',
                image_url: 'https://i.ytimg.com/vi/JNvVyW-xpTM/hqdefault.jpg?sqp=-oaymwEYCKgBEF5IVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLBx81uzd5S2xEf8KvInE4MhLXpU9A',
                default_action: {
                    "type": "web_url",
                    "url": "https://www.youtube.com/watch?v=ryXbH5z0rIk"
                }
            }
        ]
        //buttons: [{
        //    type: 'postback',
        //    title: 'View More',
        //    payload: 'VIEW_MORE'
        //}]
    });
});

//palabras clave MASTER, GRADO, POSTGRADO
// opciones con botones
unirbot.hear(config.get('estudios'), (payload, chat) => {
    chat.say({
        text: 'En qué tipo de estudios estarías interesado?',
        buttons: [{
                type: 'postback',
                title: 'Grado',
                payload: 'Grado'
            },
            {
                type: 'postback',
                title: 'Postgrado',
                payload: 'Postgrado'
            },
            {
                type: 'postback',
                title: 'Doctorado',
                payload: 'Doctorado'
            }
        ]
    });
});
// Catch Postbacks of buttons
unirbot.on('postback:Grado', (payload, chat) => {
    chat.say("Buena elección").then(()=>{
        chat.say({
            attachment: 'image',
            url: 'https://media.giphy.com/media/EpyjcKolt1cc7Xzpw8/giphy.gif'
        },{
            typing:true
        });
    });

});
unirbot.on('postback:Postgrado', (payload, chat) => {
    chat.say("Buena elección").then(()=>{
        chat.say({
            attachment: 'image',
            url: 'https://media.giphy.com/media/EpyjcKolt1cc7Xzpw8/giphy.gif'
        },{
            typing:true
        });
    });

});
unirbot.on('postback:Doctorado', (payload, chat) => {
    chat.say("Buena elección").then(()=>{
        chat.say({
            attachment: 'image',
            url: 'https://media.giphy.com/media/EpyjcKolt1cc7Xzpw8/giphy.gif'
        },{
            typing:true
        });
    });

});

//Conversation Example
unirbot.hear('conversacion', (payload, chat) => {

    const askName = (convo) => {
        convo.ask(`Cuál es tu nombre?`, (payload, convo) => {
            const text = payload.message.text;
            convo.set('name', text);
            convo.say(`Hola ${text}! :)`).then(() => askFavoriteFood(convo));
        });
    };

    const askFavoriteFood = (convo) => {
        convo.ask(`Cuál es tu comida favorita?`, (payload, convo) => {
            const text = payload.message.text;
            convo.set('food', text);
            convo.say(`${text} suena sabroso.`).then(() => sendSummary(convo));
        });
    };

    const sendSummary = (convo) => {
        convo.say(`Ok, entonces esto es lo que sé de ti:
	      - Nombre: ${convo.get('name')}
	      - Comida Favorita: ${convo.get('food')}`);
        convo.end();
    };

    chat.conversation((convo) => {
        askName(convo);
    });
});
