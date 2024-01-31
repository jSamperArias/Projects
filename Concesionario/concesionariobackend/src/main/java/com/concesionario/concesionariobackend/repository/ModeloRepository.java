package com.concesionario.concesionariobackend.repository;

import com.concesionario.concesionariobackend.model.Modelo;
import com.concesionario.concesionariobackend.model.Tractor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ModeloRepository extends JpaRepository<Modelo, Long> {}
