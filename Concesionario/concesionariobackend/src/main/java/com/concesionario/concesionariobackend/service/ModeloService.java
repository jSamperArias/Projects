package com.concesionario.concesionariobackend.service;

import com.concesionario.concesionariobackend.model.Modelo;
import com.concesionario.concesionariobackend.repository.ModeloRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ModeloService {

    @Autowired
    ModeloRepository modeloRepository;

    /**
     * Recupera todos los MODELOS almacenados en la base de datos.
     *
     * @return una lista de MODELOS.
     */
    public List<Modelo> list() {
        return modeloRepository.findAll();
    }

    /**
     * Recupera un MODELO de la base de datos según su identificador.
     *
     * @param id el identificador del MODELO a recuperar.
     * @return un Optional que contiene el MODELOS si se encuentra, o null si no existe.
     */
    public Optional<Modelo> getOne(long id) {
        return modeloRepository.findById(id);
    }

    /**
     * Guarda un MODELO en la base de datos. Si el MODELO ya existe, se actualiza;
     * de lo contrario, se crea uno nuevo.
     *
     * @param modelo el MODELO a guardar en la base de datos.
     * @return el MODELO guardado o actualizado en la base de datos.
     */
    public Modelo save(Modelo modelo) {
        return modeloRepository.save(modelo);
    }

    /**
     * Elimina un MODELO de la base de datos según su identificador.
     *
     * @param id el identificador del MODELO que se eliminará.
     */
    public void delete(long id) {
        modeloRepository.deleteById(id);
    }

}
