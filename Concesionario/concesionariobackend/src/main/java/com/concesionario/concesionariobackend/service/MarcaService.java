package com.concesionario.concesionariobackend.service;


import com.concesionario.concesionariobackend.model.Marca;
import com.concesionario.concesionariobackend.repository.MarcaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class MarcaService {

    @Autowired
    MarcaRepository marcaRepository;

    /**
     * Recupera todas las MARCAS almacenadas en la base de datos.
     *
     * @return una lista de MARCAS.
     */
    public List<Marca> list() {
        return marcaRepository.findAll();
    }

    /**
     * Recupera una MARCA de la base de datos según su identificador.
     *
     * @param id el identificador de la MARCA a recuperar.
     * @return un Optional que contiene la MARCA si se encuentra, o null si no existe.
     */
    public Optional<Marca> getOne(long id) {
        return marcaRepository.findById(id);
    }

    /**
     * Guarda una MARCA en la base de datos. Si la MARCA ya existe, se actualiza;
     * de lo contrario, se crea una nueva.
     *
     * @param marca la MARCA a guardar en la base de datos.
     * @return la MARCA guardada o actualizada en la base de datos.
     */
    public Marca save(Marca marca) {
        return marcaRepository.save(marca);
    }

    /**
     * Elimina una MARCA de la base de datos según su identificador.
     *
     * @param id el identificador de la MARCA que se eliminará.
     */
    public void delete(long id) {
        marcaRepository.deleteById(id);
    }

}
