package com.concesionario.concesionariobackend.repository;

import com.concesionario.concesionariobackend.model.Marca;
import com.concesionario.concesionariobackend.model.Modelo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MarcaRepository extends JpaRepository<Marca, Long> {}
