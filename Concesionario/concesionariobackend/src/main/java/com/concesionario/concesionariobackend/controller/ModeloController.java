package com.concesionario.concesionariobackend.controller;

import com.concesionario.concesionariobackend.model.Modelo;
import com.concesionario.concesionariobackend.model.Tractor;
import com.concesionario.concesionariobackend.repository.MarcaRepository;
import com.concesionario.concesionariobackend.service.ModeloService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/concesionario/")
@CrossOrigin
public class ModeloController {

    @Autowired
    ModeloService modeloService;
    @Autowired
    MarcaRepository marcaRepository;

    /**
     * Recupera la lista de todos los MODELOS almacenados en la base de datos.
     *
     * @return una respuesta HTTP con la lista de MODELOS y el estado OK.
     */
    @GetMapping("/modelo")
    public ResponseEntity<List<Modelo>> list() {
        List<Modelo> listaModelos = modeloService.list();
        return new ResponseEntity(listaModelos, HttpStatus.OK);
    }

    /**
     * Crea un nuevo MODELO en la base de datos.
     *
     * @param modelo el MODELO que se va a crear.
     * @return Una respuesta HTTP con el nuevo MODELO creado y el estado CREATED.
     */
    @PostMapping("/anyadirModelo")
    public ResponseEntity<Modelo> crearModelo(@RequestBody Modelo modelo) {
        Modelo nuevoModelo = modeloService.save(modelo);
        return new ResponseEntity(nuevoModelo, HttpStatus.CREATED);
    }

    /**
     * Edita un MODELO existente en la base de datos.
     *
     * @param id     el identificador del modelo a editar.
     * @param modelo el MODELO con los nuevos datos.
     * @return una respuesta HTTP con el estado OK si la edición fue exitosa, o con el estado BAD_REQUEST si hubo un error.
     */
    @PutMapping("/editarModelo/{id}")
    public ResponseEntity<Modelo> editarModelo(@PathVariable("id") Long id, @RequestBody Modelo modelo) {
        try {
            Modelo nuevoModelo = modeloService.getOne(id).get();
            nuevoModelo.setNombre_modelo(modelo.getNombre_modelo());
            nuevoModelo.setUso_modelo(modelo.getUso_modelo());
            nuevoModelo.setMarca(marcaRepository.getOne(modelo.getMarca().getId_marca()));
            modeloService.save(nuevoModelo);
            return new ResponseEntity(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Elimina un MODELO de la base de datos.
     *
     * @param id el identificador del MODELO a eliminar.
     * @return una respuesta HTTP con el estado OK si la eliminación fue exitosa, o con el estado BAD_REQUEST si hubo un error.
     */
    @DeleteMapping("eliminarModelo/{id}")
    public ResponseEntity<Modelo> eliminarModelo(@PathVariable("id") Long id) {
        try {
            modeloService.delete(id);
            return new ResponseEntity(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity("Existen campos asociados, no puede eliminar dicho registro.", HttpStatus.BAD_REQUEST);
        }
    }

}
