package edu.eci.arsw.CaptureTheFlag.model;

import java.util.Comparator;

class Comparador implements Comparator<Datos> { 

    public int compare(Datos a, Datos b) 
    { 
        return (a.getPuntos() - b.getPuntos() ) * -1; 
    } 
} 