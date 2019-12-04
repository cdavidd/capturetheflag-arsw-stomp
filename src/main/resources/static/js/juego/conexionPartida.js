var partidaModulo = (function() {
  var stompClient = null;
  var _nameSala = null;
  var _nick = null;
  var conexion = false;
  var theObject = undefined;
  var theBalaObjects = undefined;
  var theObjectSala = undefined;
  var theBanderaObjects = undefined;
  var _callback;
  var salaViva = true;

  var _crearBala = function(key, poder, x, y, dano) {
    var valor = key + ";" + poder + ";" + x + ";" + y + ";" + dano;
    stompClient.send("/app/createBalas." + _nameSala, {}, valor);
  };

  var connectAndSubscribe = function() {
    console.info("Connecting to WS...");
    var socket = new SockJS("/stompendpoint");
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function(frame) {
      console.log("Connected: " + frame);
      stompClient.subscribe("/topic/salaDatos." + _nameSala, function(
        eventbody
      ) {
        theObject = JSON.parse(eventbody.body);
      });

      stompClient.subscribe("/topic/salaBalas." + _nameSala, function(
        eventbody
      ) {
        theBalaObjects = JSON.parse(eventbody.body);
      });

      stompClient.subscribe("/topic/salaBandera." + _nameSala, function(
        eventbody
      ) {
        theBanderaObjects = JSON.parse(eventbody.body);
      });

      stompClient.subscribe("/topic/finSala." + _nameSala, function(eventbody) {
        //console.log("fin sala " + eventbody);
        theObjectSala = JSON.parse(eventbody.body);
        appModule.addPartida(theObjectSala);
        vistahtmlModule.mobalDatos(theObjectSala);
        salaViva = false;
      });

      conexion = true;
    });
  };

  return {
    //-------------------conexion
    init: function() {
      partidaModulo.disconnect();
      //console.log("sala " + _nameSala);
      _nameSala = verificationModule.readCookie("sala");
      _nick = verificationModule.readCookie("nickname");
      //_subscribe = "/topic/salaDatos.";
      connectAndSubscribe();
      main.init();
    },
    disconnect: function() {
      conexion = false;
      if (stompClient !== null) {
        stompClient.disconnect();
      }
      //console.log("Disconnected");
    },
    //-------------------sala
    finSala: function() {
      stompClient.send("/app/salaDatos." + _nameSala, {}, " ");
      stompClient.send("/app/finSala." + _nameSala, {}, " ");
    },
    /*  getSala: function(){
      if (theObjectSala !== undefined) return theObjectSala;
    },*/
    getSalaViva: function() {
      return salaViva;
    },
    //-------------------jugador
    mover: function(x, y, img) {
      if (conexion != false) {
        // console.log("mover x" + x + " y " + y);
        stompClient.send(
          "/app/salaMovimiento." + _nameSala,
          {},
          _nick + ";" + x + ";" + y + ";" + img
        );
      }
    },
    getJugadores: function(callback) {
      if (conexion != false) {
        stompClient.send("/app/salaDatos." + _nameSala, {}, " ");
      }
      if (theObject !== undefined) callback(theObject);
    },

    setVidaPJ: function(vida) {
      //console.log("vida aa " + vida);
      var valores = _nick + ";" + vida;
      stompClient.send("/app/vidaPj." + _nameSala, {}, valores);
    },

    addPuntos: function(punto) {
      var valores = _nick + ";" + punto;
      stompClient.send("/app/addPuntosPj." + _nameSala, {}, valores);
    },

    killPJ: function(asesino) {
      stompClient.send("/app/addKillPj." + _nameSala, {}, asesino);
    },

    setMuerte: function(muertes) {
      var valores = _nick + ";" + muertes;
      stompClient.send("/app/setMuertePj." + _nameSala, {}, valores);
    },

    //-------------------bala
    crearDisparo: function(id, poder, x, y, dano) {
      var key = _nick + "," + id;
      _crearBala(key, poder, x, y, dano);
    },
    getBalas: function(callback) {
      if (conexion != false) {
        stompClient.send("/app/salaBalas." + _nameSala, {}, " ");
      }
      if (theBalaObjects !== undefined) callback(theBalaObjects);
    },
    moverBala: function(id, x, y) {
      var valores = _nick + "," + id + ";" + x + ";" + y;
      stompClient.send("/app/movimientoBalas." + _nameSala, {}, valores);
    },
    colisionBala: function(id) {
      var id2 = String(id);
      if (id2.indexOf(",") != -1) {
        stompClient.send("/app/colisionBala." + _nameSala, {}, id2);
      } else {
        var key = _nick + "," + id2;
        stompClient.send("/app/colisionBala." + _nameSala, {}, key);
      }
    },
    /*
    getBalaEliminarLocal: function(callback) {
      _callback = callback;
    },*/
    //-------------------bandera
    /*moverBandera: function(x, y) {
      if (conexion != false) {
        stompClient.send(
          "/app/movimientoBandera." + _nameSala,
          {},
          _nick + ";" + x + ";" + y
        );
      }
    },*/
    cogerBandera: function() {
      stompClient.send("/app/cogerBandera." + _nameSala, {}, _nick);
    },
    getBandera: function(callback) {
      if (conexion != false) {
        stompClient.send("/app/salaBandera." + _nameSala, {}, " ");
      }
      if (theBanderaObjects !== undefined) callback(theBanderaObjects);
    }
  };
})();
