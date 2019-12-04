package edu.eci.arsw.CaptureTheFlag.model;

public class Bala {

    private String key;
    private String poder;
    private double x;
    private double y;
    private int dano;

    public Bala() {

    }

    public Bala(String key, String poder, double x, double y, int dano) {
        this.poder = poder;
        this.x = x;
        this.y = y;
        this.dano = dano;
        this.key = key;
    }

    public void moverBala(double x, double y) {
        this.x = x;
        this.y = y;
    }

    public String getPoder() {
        return poder;
    }

    public void setPoder(String poder) {
        this.poder = poder;
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

    public int getDano() {
        return dano;
    }

    public void setDano(int dano) {
        this.dano = dano;
    }

    public String getKey(){
        return key;
    }

    public void setKey(String key){
        this.key = key;
    }

    @Override
    public String toString() {
        return "Bala {dano=" + dano + ", key=" + key + ", poder=" + poder + ", x=" + x + ", y=" + y + "}";
    }
    

}