class Controlador {
  constructor() {
    this.izq = new EntradaTeclado();
    this.der = new EntradaTeclado();
    this.arriba = new EntradaTeclado();
    this.poder = false;
    this.estadoTecla = function(tipo, tecla) {
      var presionada = tipo == "keydown" ? true : false;
      var disparo = tipo == "keyup" ? true : false;
      switch (tecla) {
        case "d":
          this.der.getEntrada(presionada);
          break;
        case "a":
          this.izq.getEntrada(presionada);
          break;
        case "w":
          this.arriba.getEntrada(presionada);
          break;
        case "p":
          if(disparo) this.poder = true;
          break;
    }
    };

    this.disparar = function(tecla, callback) {
        if (tecla == "p"){
          callback();
        }  
    };

    var getOffset = function(obj) {
      var offsetLeft = 0;
      var offsetTop = 0;
      do {
        if (!isNaN(obj.offsetLeft)) {
          offsetLeft += obj.offsetLeft;
        }
        if (!isNaN(obj.offsetTop)) {
          offsetTop += obj.offsetTop;
        }
      } while ((obj = obj.offsetParent));
      return { left: offsetLeft, top: offsetTop };
    };
  }
}

class EntradaTeclado {
  constructor() {
    this.activa = this.estaPresionada = false;
  }

  getEntrada(presionada) {
    if (this.estaPresionada != presionada) this.activa = presionada;
    this.estaPresionada = presionada;
  }
}
