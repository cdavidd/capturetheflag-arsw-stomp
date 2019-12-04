var main = (function() {

  var date  = new Date();
  var tiempoDisparo = date;

  var estadoTecla = function() {
    controlador.estadoTecla(event.type, event.key);
  };

  var disparar = function() {
    controlador.disparar(event.key, activarPoder);
  };

  var redimensionar = function() {
    vista.redimensionar(
      document.documentElement.clientWidth - 32,
      document.documentElement.clientHeight - 32,
      mapa.alto / mapa.ancho
    );
    vista.renderizar();
  };

  var activarPoder = function() {
    date  = new Date();
    if (controlador.poder && (date.getTime() - tiempoDisparo.getTime())  > 500){
        tiempoDisparo = date;
        var e = new Date();
        var key = e.getTime();
        console.log("direccion " + mapa.jugador.direccion);
        mapa.jugador.poder[key] = new Mapa.Poder.Disparo(
          mapa.jugador.x,
          mapa.jugador.y,
          mapa.jugador.direccion,
          16,
          16,
          true,
          key
        );
        partidaModulo.crearDisparo(
          mapa.jugador.poder[key].id,
          mapa.jugador.poder[key].tipo,
          mapa.jugador.poder[key].x,
          mapa.jugador.poder[key].y,
          mapa.jugador.poder[key].damage
        );
        controlador.poder = false;
    }
  };

  var renderizarJugador = function(timeStamp) {
    //		vista.llenarCanvas(mapa.colorFondo);
    //		vista.dibujarMapa(mapa.map,mapa.columnas);
    //		vista.dibujarJugador(mapa.jugador.x,mapa.jugador.y,mapa.jugador.ancho,mapa.jugador.alto,mapa.jugador.color);
    //		vista.dibujarJugador(mapa.bandera.x,mapa.bandera.y,mapa.bandera.ancho,mapa.bandera.alto,"#4287f5");
    //		vista.renderizar();
    partidaModulo.getJugadores(function(estadoJuego) {
      vista.llenarCanvas(mapa.colorFondo);
      vista.dibujarMapa(mapa.map, mapa.columnas);
      estadoJuego.forEach(function(elementoActual) {
        
        mapa.checkKills(elementoActual);
        vista.dibujarJugador(
          elementoActual["x"],
          elementoActual["y"],
          20,
          20,
          elementoActual.img
        );
      });
      vista.renderizar();
    });
    partidaModulo.getBandera(function(estadoBandera) {
      //console.log("tieneBandera b" + estadoBandera.nick);
      mapa.checkBanderaJugador(estadoBandera);
      console.log("banderaa" + estadoBandera.tomada);
      if (estadoBandera.tomada == false){
        vista.dibujarBandera(
          estadoBandera["x"],
          estadoBandera["y"],
          20,
          20,
          "img/personaje/banderaa-der"
          );
      }
      vista.renderizar();
    });
    partidaModulo.getBalas(function(estadoDisparos) {
      estadoDisparos.forEach(function(elementoActual) {
        //console.log("elemento "+elementoActual);
        mapa.jugador.manejarColisiones(elementoActual);
        vista.dibujarPoder(elementoActual);
      });
      vista.renderizar();
    });
  };

  var refrescar = function() {
    if (controlador.izq.activa) {
      mapa.jugador.moverseIzq();
    }
    if (controlador.der.activa) {
      mapa.jugador.moverseDer();
    }
    if (controlador.arriba.activa) {
      mapa.jugador.saltar();
      controlador.arriba.activa = false;
    }
    activarPoder();
    mapa.refrescar();
  };

  var controlador = new Controlador();
  var vista = new Vista(document.querySelector("canvas"));
  var mapa = new Mapa();
  var motor = new Motor(1000 / 60, refrescar, renderizarJugador);

  var terminarJuego = function(){
      partidaModulo.finSala();

      //var posicion = obtenerPosicion();
      motor.stop();
  };

  
 /* var obtenerPosicion = function(){
    partidaModulo.getJugadores(function(estadoJuego) {
      var lista = {}
      estadoJuego.forEach(function(elementoActual) {
      });
    });


  }*/

  return {
    init: function() {
      vista.buffer.canvas.width = mapa.ancho;
      vista.buffer.canvas.height = mapa.alto;

      redimensionar();
      motor.start();

      vista.tileSheet.imagen.src = "js/juego/tileset.png";

      window.addEventListener("keydown", estadoTecla);
      window.addEventListener("keyup", estadoTecla);
      window.addEventListener("resize", redimensionar);
      /*if (window.PointerEvent) {
        canvas.addEventListener("pointerdown", disparar, false);
      } else {
        //Provide fallback for user agents that do not support Pointer Events
        canvas.addEventListener("mousedown", disparar, false);
      }*/
    },
    terminarJuego: terminarJuego 
  };
})();
