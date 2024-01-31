package com.concesionario.concesionariobackend.controller;

import com.concesionario.concesionariobackend.model.Modelo;
import com.concesionario.concesionariobackend.model.Tractor;
import com.concesionario.concesionariobackend.repository.ModeloRepository;
import com.concesionario.concesionariobackend.service.TractorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/concesionario/")
@CrossOrigin
public class TractorController {

    @Autowired
    TractorService tractorService;
    @Autowired
    ModeloRepository modeloRepository;

    /**
     * Recupera todos los TRACTORES almacenados en la base de datos.
     *
     * @return una respuesta HTTP con la lista de TRACTORES y el estado OK.
     */
    @GetMapping("/tractor")
    public ResponseEntity<List<Tractor>> list() {
        List<Tractor> listaTractores = tractorService.list();
        return new ResponseEntity(listaTractores, HttpStatus.OK);
    }

    /**
     * Crea un nuevo TRACTOR en la base de datos.
     *
     * @param tractor el TRACTOR que se va a crear.
     * @return una respuesta HTTP con el nuevo TRACTOR creado y el estado CREATED.
     */
    @PostMapping("/anyadirTractor")
    public ResponseEntity<Modelo> crearTractor(@RequestBody Tractor tractor) {
        Tractor nuevoTractor = tractorService.save(tractor);
        return new ResponseEntity(nuevoTractor, HttpStatus.CREATED);
    }

    /**
     * Edita un TRACTOR existente en la base de datos.
     *
     * @param id      el identificador del TRACTOR a editar.
     * @param tractor el TRACTOR con los nuevos datos.
     * @return una respuesta HTTP con el estado OK si la edición fue exitosa, o con el estado BAD_REQUEST si hubo un error.
     */
    @PutMapping("/editarTractor/{id}")
    public ResponseEntity<Tractor> editarTractor(@PathVariable("id") Long id, @RequestBody Tractor tractor) {
        try {
            Tractor nuevoTractor = tractorService.getOne(id).get();
            nuevoTractor.setNombre_tractor(tractor.getNombre_tractor());
            nuevoTractor.setPotencia_tractor(tractor.getPotencia_tractor());
            nuevoTractor.setDimensiones_tractor(tractor.getDimensiones_tractor());
            nuevoTractor.setModelo(modeloRepository.getOne(tractor.getModelo().getId_modelo()));
            tractorService.save(nuevoTractor);
            return new ResponseEntity(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Elimina un TRACTOR de la base de datos.
     *
     * @param id El identificador del TRACTOR a eliminar.
     * @return una respuesta HTTP con el estado OK si la eliminación fue exitosa, o con el estado BAD_REQUEST si hubo un error.
     */
    @DeleteMapping("eliminarTractor/{id}")
    public ResponseEntity<Modelo> eliminarTractor(@PathVariable("id") Long id) {
        try {
            tractorService.delete(id);
            return new ResponseEntity(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity("Error al eliminar el registro. Por favor, inténtelo de nuevo.", HttpStatus.BAD_REQUEST);
        }
    }

}
