package com.concesionario.concesionariobackend.model;

import jakarta.persistence.*;


@Entity
@Table(name = "tractor")
public class Tractor {

    // Atributos
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id_tractor;

    @Column(name = "nombre_tractor", length = 80, nullable = false)
    private String nombre_tractor;

    @Column(name = "potencia_tractor", length = 25, nullable = false)
    private int potencia_tractor;

    @Column(name = "dimensiones_tractor", length = 55, nullable = false)
    private String dimensiones_tractor;

    @ManyToOne(optional = false)
    @JoinColumn(name = "modelo_id_modelo")
    private Modelo modelo;

    // Constructores
    public Tractor() {
    }

    public Tractor(String nombre_tractor, int potencia_tractor, String dimensiones_tractor, Modelo modelo) {
        this.nombre_tractor = nombre_tractor;
        this.potencia_tractor = potencia_tractor;
        this.dimensiones_tractor = dimensiones_tractor;
        this.modelo = modelo;
    }

    // Getters y Setters
    public long getId_tractor() {
        return id_tractor;
    }

    public void setId_tractor(long id_tractor) {
        this.id_tractor = id_tractor;
    }

    public String getNombre_tractor() {
        return nombre_tractor;
    }

    public void setNombre_tractor(String nombre_tractor) {
        this.nombre_tractor = nombre_tractor;
    }

    public int getPotencia_tractor() {
        return potencia_tractor;
    }

    public void setPotencia_tractor(int potencia_tractor) {
        this.potencia_tractor = potencia_tractor;
    }

    public String getDimensiones_tractor() {
        return dimensiones_tractor;
    }

    public void setDimensiones_tractor(String dimensiones_tractor) {
        this.dimensiones_tractor = dimensiones_tractor;
    }

    public Modelo getModelo() {
        return modelo;
    }

    public void setModelo(Modelo modelo) {
        this.modelo = modelo;
    }
}
