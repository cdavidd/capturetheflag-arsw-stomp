package edu.eci.arsw.CaptureTheFlag.Controllers;

import java.util.concurrent.ConcurrentHashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import edu.eci.arsw.CaptureTheFlag.model.Sala;

@Controller
public class CaptureFlagSocketController {
    @Autowired
    SimpMessagingTemplate msgt;

    private ConcurrentHashMap<String, Sala> salas = new ConcurrentHashMap<>();

    // ------------------ controladores de la sala----------------------------//

    @MessageMapping("/createsala.{nombre}")
    public void createSalasEvent(String cuentaF, @DestinationVariable String nombre) throws Exception {
        if (!salas.containsKey(nombre)) {
            String[] datos = cuentaF.split(";");
            /*
             * Long id = Long.valueOf(datos[0]); String correo = datos[1]; String contrasena
             * = datos[2];
             */
            String nick = datos[0];
            String fecha = datos[1];
            // Cuenta cuenta = new Cuenta(id, correo, contrasena, nick);

            Sala sala = new Sala(nombre);
            sala.addMiembro(nick);
            sala.setFecha(fecha);
            salas.put(nombre, sala);

        }
        // System.out.println(salas.values().toString());
        msgt.convertAndSend("/topic/joinsala." + nombre, salas.get(nombre));
        msgt.convertAndSend("/topic/showsala", salas.values());
    }

    @MessageMapping("/joinsala.{nombre}")
    public void joinSalasEvent(String cuentaF, @DestinationVariable String nombre) {
        /*
         * String[] datos = cuentaF.split(";"); Long id = Long.valueOf(datos[0]); String
         * correo = datos[1]; String contrasena = datos[2];
         */
        String nick = cuentaF;
        // Cuenta cuenta = new Cuenta(id, correo, contrasena, nick);
        Sala temp = salas.get(nombre);
        temp.addMiembro(nick);
        msgt.convertAndSend("/topic/joinsala." + nombre, salas.get(nombre).miembrosName());
    }

    @MessageMapping("/sala.{nombre}")
    public void joinSalasEvent(@DestinationVariable String nombre) {
        msgt.convertAndSend("/topic/joinsala." + nombre, salas.get(nombre).miembrosName());
    }

    @MessageMapping("/showsala")
    public void showSalasEvent() {
        msgt.convertAndSend("/topic/showsala", salas.values());
    }

    @MessageMapping("/finSala.{nombre}")
    public void finSala(@DestinationVariable String nombre) {
        if (salas.containsKey(nombre)) {
            msgt.convertAndSend("/topic/finSala." + nombre, salas.get(nombre));
            salas.remove(nombre);
        }

    }

    // ------------------ controladores de la partida-----------------------------//

    // jugador
    @MessageMapping("/salaMovimiento.{nombre}")
    public void movimientos(String val, @DestinationVariable String nombre) {
        if (salas.containsKey(nombre)) {
            String temp = val;
            String[] valores = temp.split(";");
            String nick = valores[0];
            double x = Double.parseDouble(valores[1]);
            double y = Double.parseDouble(valores[2]);
            String img = valores[3];
            salas.get(nombre).movimientoPJ(nick, x, y);
            salas.get(nombre).setImgPJ(nick, img);
        }
    }

    @MessageMapping("/salaDatos.{nombre}")
    public void getDatos(@DestinationVariable String nombre) {
        if (salas.containsKey(nombre)) {
            msgt.convertAndSend("/topic/salaDatos." + nombre, salas.get(nombre).getDatos());
        }

    }

    @MessageMapping("/vidaPj.{nombre}")
    public void setVidaPersonaje(String valor, @DestinationVariable String nombre) {
        if (salas.containsKey(nombre)) {
            String[] valores = valor.split(";");
            String nick = valores[0];
            int vida = Integer.parseInt(valores[1]);
            salas.get(nombre).setVidaPJ(nick, vida);
        }
    }

    @MessageMapping("/addPuntosPj.{nombre}")
    public void addPuntosPJ(String valor, @DestinationVariable String nombre) {
        if (salas.containsKey(nombre)) {
            String[] valores = valor.split(";");
            String nick = valores[0];
            int punto = Integer.parseInt(valores[1]);
            salas.get(nombre).addPuntos(nick, punto);
        }
    }

    @MessageMapping("/addKillPj.{nombre}")
    public void addKillPJ(String nick, @DestinationVariable String nombre) {
        if (salas.containsKey(nombre)) {
            salas.get(nombre).addKill(nick);
        }
    }

    @MessageMapping("/setMuertePj.{nombre}")
    public void setMuertePJ(String valor, @DestinationVariable String nombre) {
        if (salas.containsKey(nombre)) {
            String[] valores = valor.split(";");
            String nick = valores[0];
            int muertes = Integer.parseInt(valores[1]);
            salas.get(nombre).setMuerte(nick, muertes);
        }
    }

    // Bala
    @MessageMapping("/createBalas.{nombre}")
    public void createBala(String valor, @DestinationVariable String nombre) {
        if (salas.containsKey(nombre)) {
            String[] valores = valor.split(";");
            String key = valores[0];
            String poder = valores[1];
            double x = Double.parseDouble(valores[2]);
            double y = Double.parseDouble(valores[3]);
            int dano = Integer.parseInt(valores[4]);
            salas.get(nombre).createBala(key, poder, x, y, dano);
        }
    }

    @MessageMapping("/salaBalas.{nombre}")
    public void getBalas(@DestinationVariable String nombre) {
        if (salas.containsKey(nombre)) {
            msgt.convertAndSend("/topic/salaBalas." + nombre, salas.get(nombre).balas());
        }
    }

    @MessageMapping("/movimientoBalas.{nombre}")
    public void movimientoBalas(String valor, @DestinationVariable String nombre) {
        if (salas.containsKey(nombre)) {
            String[] valores = valor.split(";");
            String key = valores[0];
            double x = Double.parseDouble(valores[1]);
            double y = Double.parseDouble(valores[2]);
            salas.get(nombre).moverBala(key, x, y);
        }
    }

    @MessageMapping("/colisionBala.{nombre}")
    public void colisionBala(String bala, @DestinationVariable String nombre) {
        if (salas.containsKey(nombre)) {
            if (salas.get(nombre).getBala(bala) != null) {
                msgt.convertAndSend("/topic/eliBalaLocal." + nombre, salas.get(nombre).getBala(bala));
                salas.get(nombre).colisionBala(bala);
            }
        }

    }

    // bandera
    /*
     * @MessageMapping("/movimientoBandera.{nombre}") public void
     * movimientoBandera(String valor, @DestinationVariable String nombre) { if
     * (salas.containsKey(nombre)) { String[] valores = valor.split(";"); String
     * nick = valores[0]; double x = Double.parseDouble(valores[1]); double y =
     * Double.parseDouble(valores[2]); if (nick ==
     * salas.get(nombre).getBandera().getNick()) {
     * salas.get(nombre).movimientoBandera(x, y);
     * msgt.convertAndSend("/topic/salaBandera." + nombre,
     * salas.get(nombre).getBandera()); }
     * 
     * } }
     */
    @MessageMapping("/salaBandera.{nombre}")
    public void getBandera(@DestinationVariable String nombre) {
        if (salas.containsKey(nombre)) {
            msgt.convertAndSend("/topic/salaBandera." + nombre, salas.get(nombre).getBandera());
        }
    }

    @MessageMapping("/cogerBandera.{nombre}")
    public void cogerBandera(String nick, @DestinationVariable String nombre) {
        // System.out.println( salas.get(nombre).getDatos());
        if (salas.containsKey(nombre)) {
            salas.get(nombre).banderaPersonaje(nick);
            msgt.convertAndSend("/topic/salaBandera." + nombre, salas.get(nombre).getBandera());
        }
    }

}
