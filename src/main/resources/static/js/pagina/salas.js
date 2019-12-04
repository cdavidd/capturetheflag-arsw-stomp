var salasModule = (function() {
  var _nick;
  var stompClient = null;
  var _nameSala;
  var _subscribe;
  var _participantes;
  var _salas;
  var _imagen;

  /*var _createCuenta = function(cuent) {
    var cuenta =
      cuent.id + ";" + cuent.correo + ";" + cuent.contrasena + ";" + cuent.nick;
    return cuenta;
  };
  */
  var _joinSala = function(cuent) {
    //var cuenta = _createCuenta(cuent);
    //console.log(cuenta);
    stompClient.send("/app/joinsala." + _nameSala, {}, cuent);
    location.href = "/sala.html";
  };

  var _createSala = function(cuent) {
    var date = new Date();
    //var cuenta = _createCuenta(cuent);
    stompClient.send(
      "/app/createsala." + _nameSala,
      {},
      cuent +
        ";" +
        date.getFullYear() +
        "-" +
        date.getMonth() +
        "-" +
        date.getDate() +
        "-" +
        date.getHours() +
        ":" +
        date.getMinutes() +
        ":" +
        date.getSeconds()
    );
    location.href = "/sala.html";
  };

  var _tablaSalas = function() {
    $("#tabla-salas > tbody").empty();
    _salas.map(function(sala) {
      $("#tabla-salas > tbody").append(
        "<tr>" +
          "<td>" +
          sala.nombre +
          "</td>" +
          "<td>" +
          Object.keys(sala.datos).length +
          "</td>" +
          "<td>" +
          "<a class='btn btn-primary' onclick='salasModule.joinSala(\"" +
          sala.nombre +
          "\")' >Unirse</a>" +
          "</td>" +
          "</tr>"
      );
    });
  };

  var _tablaParticipantes = function(participantes) {
    $("#tabla-participantes > tbody").empty();
    participantes.map(function(participante) {
      $("#tabla-participantes > tbody").append(
        "<tr>" + "<td>" + participante.nick + "</td>" + "</tr>"
      );
    });
  };
  var connectAndSubscribe = function() {
    console.info("Connecting to WS...");
    var socket = new SockJS("/stompendpoint");
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function(frame) {
      console.log("Connected: " + frame);
      if (_subscribe == "/topic/joinsala.") {
        stompClient.subscribe(_subscribe + _nameSala, function(eventbody) {
          var theObject = JSON.parse(eventbody.body);
          _participantes = theObject;
          _tablaParticipantes(_participantes);
        });
        if (_nameSala) {
          stompClient.send("/app/sala." + _nameSala, {}, " ");
        }
      } else {
        stompClient.subscribe(_subscribe, function(eventbody) {
          var theObject = JSON.parse(eventbody.body);
          _salas = theObject;
          _tablaSalas();
        });
        stompClient.send("/app/showsala", {}, " ");
      }
    });
  };

  var _createOrJoinSala = function(nSala, funcion) {
    _nameSala = nSala;
    document.cookie = "sala=" + encodeURIComponent(_nameSala);
    _nick = verificationModule.readCookie("nickname");
    funcion(_nick);
    //apiClient.checkPassword(_nick, funcion);
    document.cookie = "img=" + encodeURIComponent("verde-der");
  };

  return {
    init: function(sub) {
      salasModule.disconnect();
      if (sub == 1) {
        _subscribe = "/topic/showsala";
        connectAndSubscribe();
        //salasModule.showSalas();
      } else {
        _nameSala = verificationModule.readCookie("sala");
        _subscribe = "/topic/joinsala.";
        connectAndSubscribe();
      }
    },
    joinSala: function(nSala) {
      _createOrJoinSala(nSala, _joinSala);
    },
    createSalas: function(nSala) {
      _createOrJoinSala(nSala, _createSala);
    },
    disconnect: function() {
      if (stompClient !== null) {
        stompClient.disconnect();
      }
      console.log("Disconnected");
    },
    personaje: function(pj) {
      $("#personaje").html(
        "<img id='fantasma' src='img/personaje/" +
          pj +
          ".webp' style='height: 50px; width: 50;' >"
      );
      document.cookie = "img=" + encodeURIComponent(pj);
    }
  };
})();
