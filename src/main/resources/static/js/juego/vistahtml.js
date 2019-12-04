vistahtmlModule = (function() {

  var partida;
  var datos;

  var tablaGanador = function(sala) {
    partida = sala; 
    datos = sala.datos;
    //$("#tabla-ganador").empty();
    sala.datos.map(function(dato) {
      console.log("datos ganador nick" + dato.nick);
      console.log("datos ganador puntos" + dato.puntos);
      console.log("datos ganador kills" + dato.kills);
      console.log("datos ganador muertes" + dato.muertes);
      $("#tabla-ganador > tbody").append(
        "<tr>" +
          "<td>" +
          dato.nick +
          "</td>" +
          "<td>" +
          dato.puntos +
          "</td>" +
          "<td>" +
          dato.kills +
          "</td>" +
          "<td>" +
          dato.muertes +
          "</td>" +
          "</tr>"
      );
    });
    $("#exampleModalCenter").modal("show");
  };

  var redireccion = function() {
    appModule.addJugar(datos, partida);
  };

  var mobalDatos = function(sala) {
    tablaGanador(sala);
  };
  return {
    mobalDatos: mobalDatos,
    redireccion: redireccion
  };
})();
