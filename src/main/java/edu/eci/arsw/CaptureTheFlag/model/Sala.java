package edu.eci.arsw.CaptureTheFlag.model;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

public class Sala {

    // ConcurrentHashMap<Cuenta, Datos> miembros = new ConcurrentHashMap<>();
    // ConcurrentHashMap<String, Tupla> miembros = new ConcurrentHashMap<>();
    private ConcurrentHashMap<String, Datos> datos = new ConcurrentHashMap<>();
    // private ConcurrentHashMap<String, Cuenta> miembros = new
    // ConcurrentHashMap<>();
    private ConcurrentHashMap<String, Bala> balas = new ConcurrentHashMap<>();

    private String nombre;
    private Bandera bandera;
    private String fecha;

    public Sala() {
    }

    public Sala(String nombre) {
        this.nombre = nombre;
        this.bandera = new Bandera();
    }

    public void addMiembro(String miembro) {
        if (!datos.containsKey(miembro)) {
            // miembros.put(miembro.getNick(), miembro);
            Datos temp = new Datos(miembro);
            temp.setbG(bandera);
            datos.put(miembro, temp);
        }
    }

    public List<Datos> getDatos() {
        List<Datos> temp = new ArrayList<Datos>(datos.values());
        Collections.sort(temp, new Comparador());
        return temp;
    }

    public void setDatos(ConcurrentHashMap<String, Datos> datos) {
        this.datos = datos;
    }

    public List<Datos> miembrosName() {
        List<Datos> temp = new ArrayList<Datos>(datos.values());
        return temp;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    /*-----------------jugador --------------*/
    public void movimientoPJ(String nick, double x, double y) {
        datos.get(nick).setXY(x, y);
        if (datos.get(nick).isBandera()) {
            bandera.setXY(x, y);
        }

    }

    public void setVidaPJ(String nick, int vida) {
        datos.get(nick).setVida(vida);
    }

    public void addPuntos(String nick, int puntos) {
        datos.get(nick).setPuntos(puntos);
    }

    public void addKill(String nick) {
        datos.get(nick).setKills(datos.get(nick).getKills() + 1);
    }

    public void setMuerte(String nick, int muertes) {
        datos.get(nick).setMuertes(muertes);
    }

    public void setImgPJ(String nick, String img) {
        datos.get(nick).setImg(img);
    }

    /*-----------------balas --------------*/
    public void createBala(String key, String poder, double x, double y, int dano) {
        Bala bala = new Bala(key, poder, x, y, dano);
        balas.put(key, bala);
    }

    public List<Bala> balas() {
        List<Bala> temp = new ArrayList<Bala>(balas.values());
        return temp;
    }

    public Bala getBala(String key) {
        if (balas.containsKey(key)) {
            return balas.get(key);
        }
        return null;

    }

    public void moverBala(String key, double x, double y) {
        if (balas.containsKey(key)) {
            balas.get(key).moverBala(x, y);
        }
    }

    public void colisionBala(String bala) {
        if (balas.containsKey(bala)) {
            balas.remove(bala);
        }
    }

    /*-----------------bandera --------------*/
    /*
     * public void movimientoBandera(double x, double y) { bandera.setXY(x, y); }
     */

    public void banderaPersonaje(String nick) {
        if (!bandera.isTomada()) {
            datos.get(nick).cogerBandera();
            bandera.setNick(nick);
        }
    }

    public Bandera getBandera() {
        return bandera;
    }

    public String getFecha() {
        return fecha;
    }

    public void setFecha(String fecha) {
        this.fecha = fecha;
    }

}