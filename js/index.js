const campo = document.querySelector(".campo");
const nivel = document.querySelector(".marcador #nivel");
const puntuacion = document.querySelector(".marcador #puntuacion");
var puntos = 0;
var tiempoEspera = 1000;
var tiempoBotonesExtra = 2000;
var tiempoJuego = 100000;
var interval = null;
var interval2 = null;
var interval3 = null;
var numeroBoton = 0;
var nivelActual = 0;

//Creamos aleatoriamente los botones y los ponemos en una posición random
function crearBotones(){
  var boton = document.createElement('button');
  boton.id = "boton" + numeroBoton++;
  let dado = Math.floor(Math.random()*5)+1;

  if (dado >= 5){
    boton.className = "botonesChungos";
    boton.onclick = sumarPuntosExtra.bind(event, boton);
    campo.appendChild(boton);
    
    interval3 = setInterval( function(){
       boton.remove();
       clearInterval(interval3);
    }, tiempoBotonesExtra);
    interval3 = null;
  }
  
  else{
    boton.className = "botones";
    boton.onclick = sumarPuntos.bind(event, boton);
    campo.appendChild(boton);
  }
  
  let posX = Math.floor(Math.random() * 480);
  let posY = Math.floor(Math.random() * 380);
  boton.style.transform = "translate(" + posX + "px," + posY + "px)";
  tiempoEspera -= 100;
  if (tiempoEspera <= 200)
    tiempoEspera = 200;
}

//Destruimos los botones rojos a los 2 segundos de que aparezcan
function destruirBoton(boton){
  boton.remove();
  clearInterval(interval3);
}

//Sumamos más puntos por haber pulsado un botón rojo
function sumarPuntosExtra(boton){
  if (puntos % 100 == 0)
    nivelActual++;
  puntos += 50;
  puntuacion.innerHTML = "<h1> Puntuacion " + puntos + "</h1>";
  nivel.innerHTML = "<h1> Nivel " + nivelActual + "</h1>";
  boton.remove();
}

//Sumamos puntos cuando clickamos los botones normales
function sumarPuntos(boton){
  puntos += 10;
  if (puntos % 100 == 0)
    nivelActual++;
  if(puntos == 200){
     clearInterval(interval);
     tiempoEspera -= 100;
     interval = setInterval(crearBotones,tiempoEspera);  
  }
  if(puntos == 300){
     clearInterval(interval);
     tiempoEspera -= 100;
     interval = setInterval(crearBotones,tiempoEspera);  
  }
  
  if(puntos == 400){
     clearInterval(interval);
     tiempoEspera -= 100;
     interval = setInterval(crearBotones,tiempoEspera);  
  }

  puntuacion.innerHTML = "<h1> Puntuacion " + puntos + "</h1>";
  nivel.innerHTML = "<h1> Nivel " + nivelActual + "</h1>";
  boton.remove();
}

//Función para iniciar el juego
function comenzarJuego(){
  interval = setInterval(crearBotones, tiempoEspera);
  interval2 = setInterval(terminarJuego, tiempoJuego);
  alert("Comienza el juego. Dispones de 1 minuto para conseguir la máxima puntuación");
}

//Función para terminar el juego.
function terminarJuego(){
  clearInterval(interval);
  clearInterval(interval2);
  clearInterval(interval3);
  alert("Fin de partida. Has conseguido: " + puntos + " puntos.");
  interval = null;
  interval2 = null;
  interval3 = null;
}