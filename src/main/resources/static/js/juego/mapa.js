class Mapa{
	constructor(){
		this.collider= new Mapa.Collider();
		this.colliderBala = new Mapa.ColliderBala();
		this.colorFondo = "#000000"
		this.ancho = 500;
		this.alto =500;
		this.friccion=0.9;
		this.gravedad=2;
		//---------------------por ahora aquí, luego desde un JSON ----------
		this.columnas = 31;
		this.filas = 31;
		this.tamanioCasilla = 16;
		this.map= [1.3,1.3,1.3,1.3,1.3,1.3,1.3,1.3,1.3,1.3,1.3,1.3,1.3,1.3,1.3,1.3,1.3,1.3,1.3,1.3,1.3,1.3,1.3,1.3,1.3,1.3,1.3,1.3,1.3,1.3,1.3,
			2.1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0.3,2.1,-1,-1,-1,-1,-1,
			-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0.3,2.1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
			-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0.3,2.1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
			-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0.3,2.1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
			-1,-1,-1,-1,-1,-1,0.3,2.1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
			0.3,2.1,-1,-1,-1,4.6,4.6,4.6,4.6,4.6,4.6,4.6,4.6,4.6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0.3,2.1,-1,-1,
			-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0.3,2.1,-1,-1,-1,-1,-1,-1,-1,-1,
			-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4.6,4.6,4.6,4.6,4.6,4.6,4.6,-1,-1,-1,0.3,2.1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
			-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0.3,2.1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
			-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0.3,2.1,-1,-1,-1,-1,-1,-1,4.6,4.6,4.6,4.6,4.6,4.6,4.6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
			-1,-1,-1,-1,-1,0.3,2.1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0.3 ,
			2.1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4.6,4.6,4.6,4.6,4.6,4.6,-1,-1,-1,-1,-1,-1,-1,-1,0.3,2.1,-1,-1,-1,-1,-1,
			-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0.3,2.1,4.6,4.6,4.6,4.6,4.6,-1,-1,-1,-1,-1,-1,
			-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4.6,4.6,4.6,4.6,4.6,4.6,-1,-1,0.3,2.1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
			-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0.3,2.1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
			-1,-1,-1,-1,-1,-1,-1,0.3,2.1,-1,-1,-1,-1,-1,4.6,4.6,4.6,4.6,4.6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
			-1,-1,0.3,2.1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0.3,2.1,-1,-1,
			-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4.6,4.6,4.6,4.6,4.6,4.6,4.6,-1,-1,-1,-1,-1,-1,-1,-1,0.3,2.1,-1,-1,-1,-1,-1,-1,-1,
			-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0.3,2.1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
			-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0.3,2.1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
			-1,-1,-1,-1,-1,-1,-1,-1,0.3,2.1,-1,-1,-1,4.5,4.5,4.5,4.5,4.5,4.5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
			-1,-1,0.3,2.1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4.6,4.6,4.6,4.6,4.6,4.6,4.6,4.6,4.6,-1,-1,0.3,2.1,-1,
			-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0.3,2.1,-1,-1,-1,-1,-1,-1,-1,-1,
			-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0.3,2.1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
			-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0.3,1.3,1.3,1.3,1.3,1.3,1.3,1.3,1.3,1.3,1.3,1.3,1.3,1.3,1.3,1.3,1.3,1.3,1.3,1.3,
			1.3,1.3,1.3,1.3,1.3,1.3,1.3,1.3,1.3,1.3,1.3,1.3];
		this.layer="world";
		
		this.jugador = new Mapa.Jugador(50,100,16,16,100);
		this.bandera = new Mapa.ObjetoMovil(200,200,16,16);
		
	}

	colisionesPlataformas(objeto, collider){
		var abajo,izquierda,derecha,arriba,valCasilla;
		//sup-izq
		arriba = Math.floor(objeto.getArriba() / this.tamanioCasilla);
		izquierda = Math.floor(objeto.getIzquierda() / this.tamanioCasilla);
		valCasilla = this.map[arriba * this.columnas + izquierda];
		collider.colisionar(valCasilla,objeto,izquierda*this.tamanioCasilla,arriba*this.tamanioCasilla,this.tamanioCasilla);
		//sup-der
		arriba = Math.floor(objeto.getArriba() / this.tamanioCasilla);
		derecha = Math.floor(objeto.getDerecha() / this.tamanioCasilla);
		valCasilla = this.map[arriba * this.columnas + derecha];
		collider.colisionar(valCasilla,objeto,derecha*this.tamanioCasilla,arriba*this.tamanioCasilla,this.tamanioCasilla);
		//inf-izq
		abajo = Math.floor(objeto.getAbajo() / this.tamanioCasilla);
		izquierda = Math.floor(objeto.getIzquierda() / this.tamanioCasilla);
		valCasilla = this.map[abajo * this.columnas + izquierda];
		collider.colisionar(valCasilla,objeto,izquierda*this.tamanioCasilla,abajo*this.tamanioCasilla,this.tamanioCasilla);
		//inf-der
		abajo = Math.floor(objeto.getAbajo() / this.tamanioCasilla);
		derecha = Math.floor(objeto.getDerecha() / this.tamanioCasilla);
		valCasilla = this.map[abajo * this.columnas + derecha];
		collider.colisionar(valCasilla,objeto,derecha*this.tamanioCasilla,abajo*this.tamanioCasilla,this.tamanioCasilla);
	}
	manejarColisiones(jugador){
		if(jugador.x<0 + 18){
			jugador.x =0 + 18;
			jugador.velX=0;
		}else if(jugador.x+jugador.ancho > this.ancho-25){
			jugador.x =this.ancho - 25 - jugador.ancho;
			jugador.velX = 0;
		}
		if(jugador.y < 0){
			jugador.y=0;
			jugador.velY=0;
		}else if(jugador.y +jugador.alto > this.alto){
			jugador.saltando = false;
			jugador.y = this.alto - jugador.alto;
			jugador.velY=0;
		}
		this.colisionesPlataformas(jugador,this.collider);
		
	}

	manejarColisionesBala(bala){
		if(bala.x<2){
			partidaModulo.colisionBala(bala.id);
			bala.fin = false;
		}else if(bala.x+bala.ancho > this.ancho - 4){
			partidaModulo.colisionBala(bala.id);
			bala.fin = false;
		}
		if(bala.y <2){
			partidaModulo.colisionBala(bala.id);
			bala.fin = false;
		}else if(bala.y +bala.alto > this.alto - 4){
			partidaModulo.colisionBala(bala.id);
			bala.fin = false;
		}
		this.colisionesPlataformas(bala,this.colliderBala);
	}

	checkBanderaJugador(json){
		this.bandera = new Mapa.ObjetoMovil(json.x,json.y,16,16);
		if (this.jugador.nick == json.nick && this.jugador.tieneBandera != true){
			this.jugador.cogerBandera();
		}else if (this.jugador.nick != json.nick && this.jugador.tieneBandera != false) {
			this.jugador.quitarBandera();
		}
		else if (this.bandera.estaColisionando(this.jugador)){
			partidaModulo.cogerBandera();
		}
	}

	checkKills(json){
		if (this.jugador.nick == json.nick){
			this.jugador.kills = json.kills;
			$("#kills").text(this.jugador.kills);	
		}
	}

	refrescar(){
	
		this.jugador.velY += this.gravedad;
		this.jugador.refrescar();
		console.log("jugador: "+ this.jugador.x,this.jugador.y);

		this.jugador.velX *= this.friccion;
		//this.jugador.velY *= this.friccion;

		this.manejarColisiones(this.jugador);
		if(this.jugador.tieneBandera){
			this.bandera.x=this.jugador.x;
			this.bandera.y=this.jugador.y;
		}else if(!this.jugador.tieneBandera){
			this.bandera.velY += this.gravedad;
		}
		this.bandera.refrescar();
		this.manejarColisiones(this.bandera);
		
		//console.log("size "+ Object.keys(this.jugador.poder).length);
		
		if (Object.keys(this.jugador.poder).length > 0){
			for (var key in this.jugador.poder) {
				this.manejarColisionesBala(this.jugador.poder[key]);
				if (this.jugador.poder[key].fin == false){
					delete this.jugador.poder[key];
				}
				else{
					this.jugador.poder[key].refrescar();
				}
			}
		}
		if (this.jugador.tieneBandera){
			this.jugador.time++;
			//partidaModulo.moverBandera(this.bandera.x,this.bandera.y);
		}
	}
}

Mapa.Objeto = class {
	
	constructor(x,y,ancho,alto){
		this.ancho=ancho;
		this.alto=alto;
		
		this.x=x;
		this.y=y;
		this.xPrevFrame=x;
		this.yPrevFrame=y;
	}
	
	estaColisionando(objeto){
		return this.getDerecha() >= objeto.getIzquierda()&&
		       this.getAbajo() >= objeto.getArriba() &&
		       this.getIzquierda() <= objeto.getDerecha() &&
		       this.getArriba() <= objeto.getAbajo();
	}
	/**
	 * estos getters/setters obtienen y asignan las posisiones de los extremos del objeto.
	 */
	getAbajo(){return this.y + this.alto;}
	getIzquierda(){return this.x;}
	getDerecha(){return this.x +this.ancho;}
	getArriba(){return this.y;}
	//se usan para asignar a la posicion del jugador las posiciones de los extremos de las plataformas al colisionar con estas
	setAbajo(y){this.y = y - this.alto;}
	setIzquierda(x){this.x=x;}
	setDerecha(x){this.x=x -this.ancho;}
	setArriba(y){this.y=y;}
	
	
	getPrevAbajo(){return this.yPrevFrame + this.alto;}
	getPrevIzquierda(){return this.xPrevFrame;}
	getPrevDerecha(){return this.xPrevFrame +this.ancho;}
	getPrevArriba(){return this.yPrevFrame;}
	//se usan para asignar a la posicion del jugador las posiciones de los extremos de las plataformas al colisionar con estas
	setPrevAbajo(y){this.yPrevFrame = y - this.alto;}
	setPrevIzquierda(x){this.xPrevFrame=x;}
	setPrevDerecha(x){this.xPrevFrame=x -this.ancho;}
	setPrevArriba(y){this.yPrevFrame=y;}
}

Mapa.ObjetoMovil = class extends Mapa.Objeto{
	constructor(x,y,ancho,alto){
		super(x,y,ancho,alto);
		
		this.color = "#ff0000";
		
		this.velX=0;
		this.velY=0;	
		
	}
	
	moverseIzq(){
		this.velX-=this.pasoVelX;

	}
	
	moverseDer(){
		this.velX+=this.pasoVelX;
	}
	
	refrescar(){
		this.xPrevFrame=this.x;
		this.yPrevFrame=this.y;
		this.x += this.velX;
		this.y += this.velY;
		
	}
}

//Mapa.Bandera = class extends Mapa.ObjetoMovil{
//	constructor(x,y,ancho,alto){
//		super(x,y,ancho,alto);
//	}
//	refrescar(){
//		if(jugador.tieneBandera){
//			
//		}else
//	}
//};

Mapa.Jugador = class extends Mapa.ObjetoMovil{
	constructor(x,y,ancho,alto,vida){
		super(x,y,ancho,alto);
		this.pasoVelX=0.5;
		this.saltando = true;
		this.piso = false;
		this.poder = {};	
		this.vida=vida;
		$("#vida").text(this.vida);
		this.tieneBandera = false;
		this.puntos=0;
		$("#puntos").text(this.puntos);
		//partidaModulo.getBalaEliminarLocal(this.eliminarBala);
		this.muertes = 0;
		$("#muertes").text(this.muertes);
		this.kills = 0;
		$("#kills").text(this.kills);
		this.nick = verificationModule.readCookie("nickname");
		this.time = 0;
		this.direccion = ""; 
		this.color = "";
		this.leerCookieImagen(verificationModule.readCookie("img"));
		this.imagenB = "der";
	}
	
	saltar(){
		if(!this.saltando){
			this.saltando = true;
			this.velY -= 20;
		}
	}

	leerCookieImagen(imagen){
		var temp = imagen.split("-"); 
		this.direccion = temp[1];
		this.color = temp[0]; 
	}
	
	quitarBandera(){
		this.tieneBandera=false;
		this.leerCookieImagen(verificationModule.readCookie("img"));
	}
	cogerBandera(){
		this.tieneBandera=true;
		this.color = "bandera";
		this.direccion = "der";
	}
	enviarPuntos(){
		partidaModulo.addPuntos(this.puntos);
	}	
	moverseIzq(){
		this.velX-=this.pasoVelX;
		//if (!this.tieneBandera){
		this.direccion = "izq";
		//}
	}
	
	moverseDer(){
		this.velX+=this.pasoVelX;
		//if (!this.tieneBandera){		
		this.direccion = "der";
		//}
	}

	refrescar(){
		this.xPrevFrame=this.x;
		this.yPrevFrame=this.y;
		this.x += this.velX;
		this.y += this.velY;
		if(this.tieneBandera == true && this.time > 60){
			this.puntos++;
			this.time = 0;
			if (this.puntos % 2 == 0 ) this.imagenB = "der";			
			else this.imagenB = "izq";
			this.color = "bandera";
			$("#puntos").text(this.puntos);
			this.enviarPuntos(this.puntos);
		}
		if(this.xPrevFrame !=this.x || this.yPrevFrame!=this.y-3){
			if (this.tieneBandera){
				partidaModulo.mover(Math.floor(this.x),Math.floor(this.y)-3,this.color + "-" + this.imagenB);
			}
			else partidaModulo.mover(Math.floor(this.x),Math.floor(this.y)-3,this.color + "-" + this.direccion);
		}
	}
	manejarColisiones(poder){
		var lista = poder.key.split(","); 
		var nick = lista[0];
		var id = lista[1];
		if (verificationModule.readCookie("nickname") != nick){
			if (Math.abs(poder.x - this.x) < 14  && Math.abs(poder.y-this.y) < 14){
				this.vida = this.vida - parseInt(poder.dano,10)/2;
				partidaModulo.setVidaPJ(this.vida);
				$("#vida").text(this.vida);
				partidaModulo.colisionBala(poder.key);
				if (this.vida <= 0) this.reiniciar(nick);
			}
		}
	}

	eliminarBala(json){
	/*	var lista = json.key.split(","); 
		var id = lista[1];
		console.log("thissss "+self.poder);
		//console.log("dict "+this.poder);
		if (this.poder != undefined && Object.keys(this.poder).indexOf(id) != -1 ){
			this.poder[id].fin = false;
		}*/
	}

	reiniciar(nick){
		this.tieneBandera = false;
		this.enviarPuntos();
		this.leerCookieImagen(verificationModule.readCookie("img"));
		this.x = 30;
		this.y = 20;
		this.vida = 100;
		$("#vida").text(this.vida);
		this.muertes++;
		$("#muertes").text(this.muertes);
		partidaModulo.setMuerte(this.muertes);
		partidaModulo.killPJ(nick);
		this.time = 0;
		//console.log("tieneBandera 1 "+this.tieneBandera);
	}
	
}


Mapa.Poder = class extends Mapa.ObjetoMovil{
	constructor(x,y,direccion,ancho,alto,fin,id){
		super(x,y,ancho,alto)
		this.direccion = direccion;
		this.activo = false;
		this.drecorrida = 0;
		this.damage = 0; 
		this.tipo = "";
		this.id = id;   
		this.fin = fin; 
		this.velX = 2;
	}
}

Mapa.Poder.Disparo = class extends Mapa.Poder{
	constructor(x,y,direccion,ancho,alto,fin,id){
		super(x,y,direccion,ancho,alto,fin,id)
		this.damage = 20; 
		this.tipo = "Disparo";
	}

	refrescar(){
		if (this.direccion == "izq"){
			this.x = this.x - 4;
			partidaModulo.moverBala(this.id,this.x,this.y);
		}
		else {
			this.x = this.x + 4;
			partidaModulo.moverBala(this.id,this.x,this.y);
		}
	}
}

Mapa.Collider = class {
	
	constructor(){
		this.colisionar = function(posPlataforma,jugador,casillaX,casillaY,tamanioCasilla){
			if(posPlataforma!==-1)
				this.manejarColisionesPlataformaArriba(jugador,casillaY);
		}
	}
	
	manejarColisionesPlataformaAbajo(){
		
	}
	
	manejarColisionesPlataformaIzquierda(){
		
	}
	
	manejarColisionesPlataformaDerecha(){
		
	}

	manejarColisionesPlataformaArriba(jugador,arribaPlataforma){
		if(jugador.getAbajo() > arribaPlataforma && jugador.getPrevAbajo() <= arribaPlataforma){
			jugador.setAbajo(arribaPlataforma);
			jugador.velY = 0;
			jugador.saltando = false;
		}
	}
	
}
Mapa.ColliderBala = class {
	constructor(){
		this.colisionar = function(posPlataforma,bala,casillaX,casillaY,tamanioCasilla){
			if(posPlataforma!==-1)
				this.manejarColisionesPlataformaArriba(bala,casillaY);
		}
	}
	
	manejarColisionesPlataformaAbajo(){
		
	}
	
	manejarColisionesPlataformaIzquierda(){
		
	}
	
	manejarColisionesPlataformaDerecha(){
		
	}

	manejarColisionesPlataformaArriba(bala,arribaPlataforma){
		if(bala.getAbajo() > arribaPlataforma){
			partidaModulo.colisionBala(bala.id);
			bala.fin = false;
		}
	}
}
