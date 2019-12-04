const apiUri = "http://capturetheflag-arsw.herokuapp.com/";
apiClient = (function() {
  return {
    saveCuenta: function(cuenta) {
      //console.log(cuenta);
      $.ajax({
        url: apiUri + "cuentas/",
        type: "post",
        data: cuenta,
        contentType: "application/json"
      });
    },

    savePartida: function(partida) {
      //console.log(cuenta);
      $.ajax({
        url: apiUri + "partidas/",
        type: "post",
        data: partida,
        contentType: "application/json"
      });
    },

    saveJugar: function(jugar, nick) {
      console.log("jugar " + jugar);
      $.ajax({
        url: apiUri + "cuentas/" + nick + "/partidas",
        type: "post",
        data: jugar,
        contentType: "application/json",
        success: function() {
          location.href = "/home.html";
        }
      });
    },

    getPartida: function(nombre, fecha, callback, dato, posicion) {
      console.log("fecha: " + fecha + "nombre: " + nombre);
      $.ajax({
        url: apiUri + "partidas/" + fecha + "/" + nombre,
        success: function(result) {
          console.log("partidaaaa " + result);
          callback(result, dato, posicion);
        }
      });
    },

    getJugador: function(nick, dato, posicion, sala, callback) {
      $.ajax({
        url: apiUri + "cuentas/" + nick,
        success: function(result) {
          console.log("jugador " + result);
          callback(result, dato, posicion, sala);
        }
      });
    },

    getPartidasUser: function(nick, callback) {
      $.ajax({
        url: apiUri + "cuentas/" + nick + "/partidas",
        success: function(result) {
          //console.log(result);
          callback(result);
        }
      });
    },

    checkPassword: function(nick, callback) {
      jQuery.ajax({
        url: apiUri + "cuentas/" + nick,
        success: function(result) {
          //console.log(result);
          callback(result);
        },
        async: true
      });
    }
  };
})();
