package com.concesionario.concesionariobackend.service;


import com.concesionario.concesionariobackend.model.Tractor;
import com.concesionario.concesionariobackend.repository.TractorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class TractorService {

    @Autowired
    TractorRepository tractorRepository;

    /**
     * Devuelve de la base de datos, la tabla TRACTORES.
     *
     * @return una lista de tractores.
     */
    public List<Tractor> list() {
        return tractorRepository.findAll();
    }

    /**
     * Permíte devolver un TRACTOR de la base de datos a través de un ID.
     *
     * @param id ID del tractor a buscar.
     * @return un Optional que contiene el TRACTOR si se encuentra, o null si no existe.
     */
    public Optional<Tractor> getOne(long id) {
        return tractorRepository.findById(id);
    }

    /**
     * Guarda un tractor en la base de datos. Si el tractor ya existe, se actualiza;
     * de lo contrario, se crea uno nuevo.
     *
     * @param tractor el tractor a guardar en la base de datos.
     * @return el tractor guardado o actualizado en la base de datos.
     */
    public Tractor save(Tractor tractor) {
        return tractorRepository.save(tractor);
    }

    /**
     * Elimina un TRACTOR de la base de datos según su identificador.
     *
     * @param id el identificador del TRACTOR que se eliminará.
     */
    public void delete(long id) {
        tractorRepository.deleteById(id);
    }

}
