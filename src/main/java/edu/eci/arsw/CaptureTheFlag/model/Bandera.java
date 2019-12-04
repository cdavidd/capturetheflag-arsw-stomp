package edu.eci.arsw.CaptureTheFlag.model;

public class Bandera {
    private String nick;
    private double x = 50;
    private double y = 50;
    private boolean tomada = false;

    public Bandera() {
    }

    public void setXY(double x, double y) {
        this.x = x;
        this.y = y;
    }

    public double getX() {
        return x;
    }

    public void setX(double x) {
        this.x = x;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }

    public boolean isTomada() {
        return tomada;
    }

    public void setTomada(boolean tomada) {
        this.tomada = tomada;
    }

    public String getNick() {
        return nick;
    }

    public void setNick(String nick) {
        this.nick = nick;
    }

    @Override
    public String toString() {
        return "Bandera {nick=" + nick + ", tomada=" + tomada + ", x=" + x + ", y=" + y + "}";
    }

}