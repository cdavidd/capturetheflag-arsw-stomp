class Vista {
  constructor(canvas) {
    this.buffer = document.createElement("canvas").getContext("2d");
    this.context = canvas.getContext("2d");
    //--- toca cambiar parametros si se quieren mas tilesheets
    this.tileSheet = new Vista.TileSheet(16, 6);
    this.dibujarMapa = function(mapa, columnas) {
      for (let i = 0; i < mapa.length; i++) {
        let valCasilla = mapa[i];

        let sourceX =
          Math.floor(valCasilla / 1) * this.tileSheet.tamanioCasilla;
        let sourceY =
          Math.round((valCasilla % 1) * 10) * this.tileSheet.tamanioCasilla;

        let destinationX = (i % columnas) * this.tileSheet.tamanioCasilla;
        let destinationY =
          Math.floor(i / columnas) * this.tileSheet.tamanioCasilla;

        this.buffer.drawImage(
          this.tileSheet.imagen,
          sourceX,
          sourceY,
          this.tileSheet.tamanioCasilla,
          this.tileSheet.tamanioCasilla,
          destinationX,
          destinationY,
          this.tileSheet.tamanioCasilla,
          this.tileSheet.tamanioCasilla
        );
      }
    };

    this.dibujarJugador = function(x, y, ancho, alto, imagen) {
      var aspecto = new Image();
      aspecto.src = "img/personaje/" + imagen + ".webp";
      this.buffer.drawImage(aspecto, x, y, ancho, alto);
    };

    this.dibujarBandera = function(x,y,ancho,alto,imagen){
      var bandera = new Image();
      bandera.src =  imagen + ".webp";
      this.buffer.drawImage(bandera, x, y, ancho, alto);
    }

    this.dibujarPoder = function(poder) {
      var poderI = new Image();
      poderI.src = "img/disparo.webp";
      this.buffer.drawImage(poderI, poder.x, poder.y, 12, 12);
    };

    this.llenarCanvas = function(color) {
      this.buffer.fillStyle = color;
      this.buffer.fillRect(
        0,
        0,
        this.buffer.canvas.width,
        this.buffer.canvas.height
      );
    };
    this.renderizar = function() {
      this.context.drawImage(
        this.buffer.canvas,
        0,
        0,
        this.buffer.canvas.width,
        this.buffer.canvas.height,
        0,
        0,
        this.context.canvas.width,
        this.context.canvas.height
      );
    };
    this.redimensionar = function(ancho, alto, razonAltoAncho) {
      if (alto / ancho > razonAltoAncho) {
        this.context.canvas.height = ancho * razonAltoAncho;
        this.context.canvas.width = ancho;
      } else {
        this.context.canvas.height = alto;
        this.context.canvas.width = alto / razonAltoAncho;
      }

      this.context.imageSmoothingEnabled = false;
    };
  }
}

Vista.TileSheet = class {
  constructor(tamanioCasilla, columnas, filas) {
    this.imagen = new Image();
    this.tamanioCasilla = tamanioCasilla;
    this.columnas = columnas;
  }
};
