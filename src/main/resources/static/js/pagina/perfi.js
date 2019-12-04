var perfilModule = (function() {
  var _nick;
  var _victorias = 0;
  var _kills = 0;
  var _muertes = 0;
  var _total = 0;

  var _genStadisticas = function() {
    var pVictoria = Math.round((_victorias * 100) / _total);
    $("#tabla-estadisticas-jugador > tbody").empty();
    $("#tabla-estadisticas-jugador > tbody").append(
      "<tr>" +
        "<td>" +
        _victorias +
        "</td>" +
        "<td>" +
        _kills +
        "</td>" +
        "<td>" +
        _muertes +
        "</td>" +
        "<td>" +
        pVictoria +
        "%" +
        "</td>" +
        "</tr>"
    );
  };

  var _genTable = function(partidasJugadas) {
    _kills = 0;
    _muertes = 0;
    _total = 0;
    _victorias = 0;
    $("#tabla-partidas-jugador > tbody").empty();
    partidasJugadas.map(function(partida) {
      if (partida.posicion == 1) {
        _victorias++;
      }
      _kills += partida.kills;
      _muertes += partida.muertes;
      _total++;
      $("#tabla-partidas-jugador > tbody").append(
        "<tr>" +
          "<td>" +
          partida.partida.nombre +
          "</td>" +
          "<td>" +
          partida.puntos +
          "</td>" +
          "<td>" +
          partida.posicion +
          "</td>" +
          "<td>" +
          partida.muertes +
          "</td>" +
          "<td>" +
          partida.kills +
          "</td>" +
          "<td>" +
          partida.partida.fecha +
          "</td>" +
          "</tr>"
      );
    });
    _genStadisticas();
  };

  var partidasJugadas = function() {
    _nick = verificationModule.readCookie("nickname");
    $("#portada-perfil > h1").text("Nick: " + _nick);
    apiClient.getPartidasUser(_nick, _genTable);
  };

  var init = function() {
    document.getElementById("inicio-perfil").click();
  };

  var cerrarSesion = function() {
    verificationModule.borrar_cookie();
    location.href = "/index.html";
  };
  return {
    partidasJugadas: partidasJugadas,
    init: init,
    cerrarSesion: cerrarSesion
  };
})();
