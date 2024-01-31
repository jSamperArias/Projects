package com.concesionario.concesionariobackend.model;

import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "modelo")
public class Modelo {

    // Atributos
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id_modelo;

    @Column(name = "nombre_modelo", length = 55, nullable = false)
    private String nombre_modelo;

    @Column(name = "uso_modelo", length = 25, nullable = false)
    private String uso_modelo;

    @ManyToOne(optional = false)
    @JoinColumn(name = "marca_id_marca")
    private Marca marca;

    // Constructores
    public Modelo(){}

    public Modelo(String nombre_modelo, String uso_modelo, Marca marca) {
        this.nombre_modelo = nombre_modelo;
        this.uso_modelo = uso_modelo;
        this.marca = marca;
    }

    // Getters y Setter
    public long getId_modelo() {
        return id_modelo;
    }

    public void setId_modelo(long id_modelo) {
        this.id_modelo = id_modelo;
    }

    public String getNombre_modelo() {
        return nombre_modelo;
    }

    public void setNombre_modelo(String nombre_modelo) {
        this.nombre_modelo = nombre_modelo;
    }

    public String getUso_modelo() {
        return uso_modelo;
    }

    public void setUso_modelo(String uso_modelo) {
        this.uso_modelo = uso_modelo;
    }

    public Marca getMarca() {
        return marca;
    }

    public void setMarca(Marca marca) {
        this.marca = marca;
    }

}
