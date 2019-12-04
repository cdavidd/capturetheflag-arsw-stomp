var appModule = (function() {
  var nick;
  var jugador; 

  var checkPassword = function() {
    var nick = $("#nick").val();
    apiClient.checkPassword(nick, _check);
  };

  var addAcount = function() {
    var correo = $("#email").val();
    var nick = $("#nick").val();
    var password = $("#password").val();
    var cuenta = { correo: correo, contrasena: password, nick: nick };
    apiClient.saveCuenta(JSON.stringify(cuenta));
    location.href = "/index.html";
  };

  var addPartida = function(sala) {
    var date = sala.fecha;
    var nombre = verificationModule.readCookie("sala");
    var partida = { fecha: date, nombre: nombre };
    apiClient.savePartida(JSON.stringify(partida));
  };
  

  var addJugar = function(json,sala){
    nick = verificationModule.readCookie("nickname");
    var posicion = 1;
    json.forEach(function(dato) {
      if (dato.nick == nick){
        _getJugador(nick,dato,posicion,sala);
      }
      else {
        posicion++;
      }
    });
  };

  var _getJugador = function(nick,dato,posicion,sala) {
    apiClient.getJugador(nick,dato,posicion,sala,consultarPartida);
  };

  var consultarPartida = function(player,dato,posicion,sala){
    jugador = player;
    _getPartida(
      verificationModule.readCookie("sala"),
      sala.fecha,dato,posicion
    );
  }
  var _getPartida = function(nombre, fecha,dato,posicion) {
    apiClient.getPartida(nombre, fecha,enviarPartida,dato,posicion);
  };

  var enviarPartida = function(sala,dato,posicion){
    var jugar = {
      cuenta: {
        id: jugador.id,
        correo: jugador.correo,
        contrasena: jugador.contrasena,
        nick: jugador.nick
      },
      partida: { id: sala.id, fecha: sala.fecha, nombre: sala.nombre },
      kills: dato.kills,
      muertes: dato.muertes,
      posicion: posicion,
      puntos: dato.puntos
    };
    apiClient.saveJugar(JSON.stringify(jugar), jugador.nick);
  }

 

  var _check = function(cuenta) {
    var password = $("#password").val();
    if (cuenta.contrasena === password) {
      nick = $("#nick").val();
      location.href = "/home.html";
      //console.log("appmodule " + nick);
      verificationModule.crear_cookie_sesion(nick);
    } else {
      alert("Incorrect password");
    }
  };

  return {
    checkPassword: checkPassword,
    addAcount: addAcount,
    addPartida: addPartida,
    addJugar: addJugar
  };
})();

