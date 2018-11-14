/* El objeto Juego sera el encargado del control de todo el resto de los Objetos
existentes.
Le dara ordenes al Dibujante para que dibuje entidades en la pantalla. Cargara
el mapa, chequeara colisiones entre los objetos y actualizara sus movimientos
y ataques. Gran parte de su implementacion esta hecha, pero hay espacios con el
texto COMPLETAR que deben completarse segun lo indique la consigna.

El objeto Juego contiene mucho codigo. Tomate tu tiempo para leerlo tranquilo
y entender que es lo que hace en cada una de sus partes. */

var Juego = {
  // Aca se configura el tamanio del canvas del juego
  anchoCanvas: 961,
  altoCanvas: 577,
  jugador: Jugador,
  vidasInicial: Jugador.vidas,
  // Indica si el jugador gano
  ganador: false,

  obstaculosCarretera: [
    /*Aca se van a agregar los obstaculos visibles. Tenemos una valla horizontal
    de ejemplo, pero podras agregar muchos mas. */
    new Obstaculo('imagenes/valla_horizontal.png', 90, 120, 30, 30, 1),
    new Obstaculo('imagenes/valla_horizontal.png', 120, 120, 30, 30, 1),
    new Obstaculo('imagenes/valla_horizontal.png', 150, 120, 30, 30, 1),
    new Obstaculo('imagenes/valla_vertical.png', 90, 120, 30, 30, 1),
    new Obstaculo('imagenes/valla_vertical.png', 150, 120, 30, 30, 1),
    new Obstaculo('imagenes/valla_horizontal.png', 170, 360, 30, 30, 1),
    new Obstaculo('imagenes/valla_horizontal.png', 70, 440, 30, 30, 1),
    new Obstaculo('imagenes/valla_horizontal.png', 100, 460, 30, 30, 1),
    new Obstaculo('imagenes/bache.png', 300, 470, 30, 30, 0.5),
    new Obstaculo('imagenes/bache.png', 360, 370, 30, 30, 0.5),
    new Obstaculo('imagenes/auto_verde_abajo.png', 430, 390, 15, 30, 1.2),
    new Obstaculo('imagenes/valla_horizontal.png', 560, 400, 30, 30, 1),
    new Obstaculo('imagenes/auto_verde_derecha.png', 460, 280, 30, 15, 1.2),
    new Obstaculo('imagenes/valla_vertical.png', 300, 250, 30, 30, 1),
    new Obstaculo('imagenes/bache.png', 600, 120, 30, 30, 1),
    new Obstaculo('imagenes/auto_verde_derecha.png', 850, 110, 30, 15, 1.2),
    new Obstaculo('imagenes/valla_horizontal.png', 760, 200, 30, 30, 1),
    new Obstaculo('imagenes/valla_vertical.png', 760, 200, 30, 30, 1),
  ],
  /* Estos son los bordes con los que se puede chocar, por ejemplo, la vereda.
   Ya estan ubicados en sus lugares correspondientes. Ya aparecen en el mapa, ya
   que son invisibles. No tenes que preocuparte por ellos.*/
  bordes: [
    // // Bordes
    new Obstaculo('', 0, 5, 961, 18, 0),
    new Obstaculo('', 0, 559, 961, 18, 0),
    new Obstaculo('', 0, 5, 18, 572, 0),
    new Obstaculo('', 943, 5, 18, 572, 0),
    // Veredas
    new Obstaculo('', 18, 23, 51, 536, 2),
    new Obstaculo('', 69, 507, 690, 52, 2),
    new Obstaculo('', 587, 147, 173, 360, 2),
    new Obstaculo('', 346, 147, 241, 52, 2),
    new Obstaculo('', 196, 267, 263, 112, 2),
    new Obstaculo('', 196, 23, 83, 244, 2),
    new Obstaculo('', 279, 23, 664, 56, 2),
    new Obstaculo('', 887, 79, 56, 480, 2)
  ],
  // Los enemigos se agregaran en este arreglo.
  enemigos: [
    new ZombieCaminante('imagenes/zombie1.png', 200, 500, 10, 10, 1, {desdeX: 0, hastaX: 400, desdeY: 50, hastaY: 100}, 1),
    new ZombieCaminante('imagenes/zombie2.png', 350, 100, 10, 10, 1, {desdeX: 250, hastaX: 600, desdeY: 250, hastaY: 300}, 1),
    new ZombieCaminante('imagenes/zombie3.png', 500, 300, 10, 10, 1, {desdeX: 150, hastaX: 550, desdeY: 450, hastaY: 500}, 1),
    new ZombieCaminante('imagenes/zombie4.png', 650, 400, 10, 10, 1, {desdeX: 650, hastaX: 900, desdeY: 150, hastaY: 200}, 1),
    new ZombieCaminante('imagenes/zombie1.png', 800, 200, 10, 10, 1, {desdeX: 400, hastaX: 850, desdeY: 100, hastaY: 150}, 1),

    new ZombieConductor('imagenes/tren_horizontal.png', -100, 324, 90, 30, 3, {desdeX: -100, hastaX: 1200, desdeY: 324, hastaY: 324}, 0, 'h'),
    new ZombieConductor('imagenes/tren_vertical.png', 644, -100, 30, 90, 2, {desdeX: 644, hastaX: 644, desdeY: -200, hastaY: 800}, 0,'v'),
    new ZombieConductor('imagenes/tren_vertical.png', 674, -300, 30, 90, 1.5, {desdeX: 674, hastaX: 674, desdeY: -300, hastaY: 850}, 0,'v'),

  ],
};

/* Se cargan los recursos de las imagenes, para tener un facil acceso
a ellos. No hace falta comprender esta parte. Pero si queres agregar tus propies
imagenes tendras que poner su ruta en la lista para que pueda ser precargada como
todas las demas. */
Juego.iniciarRecursos = function() {
  Resources.load([
    'imagenes/mapa.png',
    'imagenes/mensaje_gameover.png',
    'imagenes/Splash.png',
    'imagenes/bache.png',
    'imagenes/tren_horizontal.png',
    'imagenes/tren_vertical.png',
    'imagenes/valla_horizontal.png',
    'imagenes/valla_vertical.png',
    'imagenes/zombie1.png',
    'imagenes/zombie2.png',
    'imagenes/zombie3.png',
    'imagenes/zombie4.png',
    'imagenes/auto_rojo_abajo.png',
    'imagenes/auto_rojo_arriba.png',
    'imagenes/auto_rojo_derecha.png',
    'imagenes/auto_rojo_izquierda.png',
    'imagenes/auto_verde_abajo.png',
    'imagenes/auto_verde_derecha.png',
    'imagenes/mapa/tunel.png',
  ]);
  Resources.onReady(this.comenzar.bind(Juego));
};

// Agrega los bordes de las veredas a los obstaculos de la carretera
Juego.obstaculos = function() {
  return this.obstaculosCarretera.concat(this.bordes);
};

Juego.comenzar = function() {
  // Inicializar el canvas del juego
  Dibujante.inicializarCanvas(this.anchoCanvas, this.altoCanvas);
  /* El bucle principal del juego se llamara continuamente para actualizar
  los movimientos y el pintado de la pantalla. Sera el encargado de calcular los
  ataques, colisiones, etc*/
  this.buclePrincipal();
};

Juego.buclePrincipal = function() {

  // Con update se actualiza la logica del juego, tanto ataques como movimientos
  this.update();
  // Funcion que dibuja por cada fotograma a los objetos en pantalla.
  this.dibujar();
  // Esto es una forma de llamar a la funcion Juego.buclePrincipal() repetidas veces
  window.requestAnimationFrame(this.buclePrincipal.bind(this));
};

Juego.update = function() {
  this.calcularAtaques();
  this.moverEnemigos();
}
// Captura las teclas y si coincide con alguna de las flechas tiene que
// hacer que el jugador principal se mueva
Juego.capturarMovimiento = function(tecla) {
  var movX = 0;
  var movY = 0;
  var velocidad = this.jugador.velocidad;

  // El movimiento esta determinado por la velocidad del jugador
  if (tecla == 'izq') {
    movX = -velocidad;
    Jugador.sprite = 'imagenes/auto_rojo_izquierda.png';
    Jugador.ancho=30;
    Jugador.alto=15;
  }
  if (tecla == 'arriba') {
    movY = -velocidad;
    Jugador.sprite='imagenes/auto_rojo_arriba.png';
    Jugador.ancho=15;
    Jugador.alto=30;
  }
  if (tecla == 'der') {
    movX = +velocidad;
    Jugador.sprite='imagenes/auto_rojo_derecha.png';
    Jugador.ancho=30;
    Jugador.alto=15;
  }
  if (tecla == 'abajo') {
    movY = +velocidad;
    Jugador.sprite='imagenes/auto_rojo_abajo.png';
    Jugador.ancho=15;
    Jugador.alto=30;
  }

  // Si se puede mover hacia esa posicion hay que hacer efectivo este movimiento
  if (this.chequearColisiones(movX + this.jugador.x, movY + this.jugador.y)) {
    /* Aca tiene que estar la logica para mover al jugador invocando alguno
    de sus metodos  */
    Jugador.move(movX, movY);
    /* COMPLETAR */
  }
};

Juego.dibujar = function() {
  // Borrar el fotograma actual
  Dibujante.borrarAreaDeJuego();
  //Se pinta la imagen de fondo segun el estado del juego
  this.dibujarFondo();

  /*Dibujo linea de llegada aca para que no quede una capa arriba del jugador*/
  drawFlag();
  /* Aca hay que agregar la logica para poder dibujar al jugador principal
  utilizando al dibujante y los metodos que nos brinda.
  "Dibujante dibuja al jugador" */
  Dibujante.dibujarEntidad(Jugador);
  /* Completar */

  // Se recorren los obstaculos de la carretera pintandolos
  this.obstaculosCarretera.forEach(function(obstaculo) {
    Dibujante.dibujarEntidad(obstaculo);
  });

  // Se recorren los enemigos pintandolos
  this.enemigos.forEach(function(enemigo) {
    /* Completar */
    Dibujante.dibujarEntidad(enemigo);
    if (enemigo.direccion === 'h') {
      Dibujante.dibujarImagen('imagenes/mapa/tunel.png', 619.5, 273, 106, 136);
    };
  });

  // El dibujante dibuja las vidas del jugador
  var tamanio = this.anchoCanvas / this.vidasInicial;
  Dibujante.dibujarRectangulo('white', 0, 0, this.anchoCanvas, 8);
  for (var i = 0; i < this.jugador.vidas; i++) {
    var x = tamanio * i
    Dibujante.dibujarRectangulo('red', x, 0, tamanio, 8);
  }


  function drawFlag() {
    // Se dibuja la linea de llegada
    //primera linea
    Dibujante.dibujarRectangulo('black', 760, 400, 8, 8);
    Dibujante.dibujarRectangulo('white', 769, 400, 8, 8);
    Dibujante.dibujarRectangulo('black', 778, 400, 8, 8);
    Dibujante.dibujarRectangulo('white', 787, 400, 8, 8);
    Dibujante.dibujarRectangulo('black', 796, 400, 8, 8);
    Dibujante.dibujarRectangulo('white', 805, 400, 8, 8);
    Dibujante.dibujarRectangulo('black', 814, 400, 8, 8);
    Dibujante.dibujarRectangulo('white', 823, 400, 8, 8);
    Dibujante.dibujarRectangulo('black', 832, 400, 8, 8);
    Dibujante.dibujarRectangulo('white', 841, 400, 8, 8);
    Dibujante.dibujarRectangulo('black', 850, 400, 8, 8);
    Dibujante.dibujarRectangulo('white', 859, 400, 8, 8);
    Dibujante.dibujarRectangulo('black', 868, 400, 8, 8);
    Dibujante.dibujarRectangulo('white', 877, 400, 8, 8);
    //segunda linea
    Dibujante.dibujarRectangulo('white', 760, 408, 8, 8);
    Dibujante.dibujarRectangulo('black', 769, 408, 8, 8);
    Dibujante.dibujarRectangulo('white', 778, 408, 8, 8);
    Dibujante.dibujarRectangulo('black', 787, 408, 8, 8);
    Dibujante.dibujarRectangulo('white', 796, 408, 8, 8);
    Dibujante.dibujarRectangulo('black', 805, 408, 8, 8);
    Dibujante.dibujarRectangulo('white', 814, 408, 8, 8);
    Dibujante.dibujarRectangulo('black', 823, 408, 8, 8);
    Dibujante.dibujarRectangulo('white', 832, 408, 8, 8);
    Dibujante.dibujarRectangulo('black', 841, 408, 8, 8);
    Dibujante.dibujarRectangulo('white', 850, 408, 8, 8);
    Dibujante.dibujarRectangulo('black', 859, 408, 8, 8);
    Dibujante.dibujarRectangulo('white', 868, 408, 8, 8);
    Dibujante.dibujarRectangulo('black', 877, 408, 8, 8);
  }
};



/* Recorre los enemigos haciendo que se muevan. De la misma forma que hicimos
un recorrido por los enemigos para dibujarlos en pantalla ahora habra que hacer
una funcionalidad similar pero para que se muevan.*/
Juego.moverEnemigos = function() {
  /* COMPLETAR */
  this.enemigos.forEach(function (enemigo) {
    enemigo.mover();
  })
};

/* Recorre los enemigos para ver cual esta colisionando con el jugador
Si colisiona empieza el ataque el zombie, si no, deja de atacar.
Para chequear las colisiones estudiar el metodo posicionValida. Alli
se ven las colisiones con los obstaculos. En este caso sera con los zombies. */
Juego.calcularAtaques = function() {
  this.enemigos.forEach(function(enemigo) {
    if (this.intersecan(enemigo, this.jugador, this.jugador.x, this.jugador.y)) {
      /* Si el enemigo colisiona debe empezar su ataque
      COMPLETAR */
      enemigo.comenzarAtaque(this.jugador);
    } else {
      /* Sino, debe dejar de atacar
      COMPLETAR */
      enemigo.dejarDeAtacar();
    }
  }, this);
};



/* Aca se chequea si el jugador se peude mover a la posicion destino.
 Es decir, que no haya obstaculos que se interpongan. De ser asi, no podra moverse */
Juego.chequearColisiones = function(x, y) {
  var puedeMoverse = true
  this.obstaculos().forEach(function(obstaculo) {
    if (this.intersecan(obstaculo, this.jugador, x, y)) {

      /*COMPLETAR, obstaculo debe chocar al jugador*/
      obstaculo.crash(this.jugador);
      puedeMoverse = false
    }
  }, this)
  return puedeMoverse
};

/* Este metodo chequea si los elementos 1 y 2 si cruzan en x e y
 x e y representan la coordenada a la cual se quiere mover el elemento2*/
Juego.intersecan = function(elemento1, elemento2, x, y) {
  var izquierda1 = elemento1.x
  var derecha1 = izquierda1 + elemento1.ancho
  var techo1 = elemento1.y
  var piso1 = techo1 + elemento1.alto
  var izquierda2 = x
  var derecha2 = izquierda2 + elemento2.ancho
  var techo2 = y
  var piso2 = y + elemento2.alto

  return ((piso1 >= techo2) && (techo1 <= piso2) &&
    (derecha1 >= izquierda2) && (izquierda1 <= derecha2))
};

Juego.dibujarFondo = function() {
  // Si se termino el juego hay que mostrar el mensaje de game over de fondo
  if (this.terminoJuego()) {
    Dibujante.dibujarImagen('imagenes/mensaje_gameover.png', 0, 5, this.anchoCanvas, this.altoCanvas);
    document.getElementById('reiniciar').style.visibility = 'visible';
  }

  // Si se gano el juego hay que mostrar el mensaje de ganoJuego de fondo
  else if (this.ganoJuego()) {
    Dibujante.dibujarImagen('imagenes/Splash.png', 190, 113, 500, 203);
    document.getElementById('reiniciar').style.visibility = 'visible';
  } else {
    Dibujante.dibujarImagen('imagenes/mapa.png', 0, 5, this.anchoCanvas, this.altoCanvas);
  }
};

Juego.terminoJuego = function() {
  return this.jugador.vidas <= 0;
};

/* Se gana el juego si se sobre pasa cierto altura y */
Juego.ganoJuego = function() {
  return (this.jugador.y + this.jugador.alto) > 530;
};

Juego.iniciarRecursos();

// Activa las lecturas del teclado al presionar teclas
// Documentacion: https://developer.mozilla.org/es/docs/Web/API/EventTarget/addEventListener
var audio = new Audio('audio/car.mp3');
var music = new Audio('audio/backMusic.mp3');
document.addEventListener('keydown', function(e) {
audio.play();
audio.volume = 0.5;
music.play();
music.volume = 1;
  var allowedKeys = {
    37: 'izq',
    38: 'arriba',
    39: 'der',
    40: 'abajo'
  };

  Juego.capturarMovimiento(allowedKeys[e.keyCode]);
});

document.addEventListener('keyup', function () {
  audio.pause();
});
