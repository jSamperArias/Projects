package com.concesionario.concesionariobackend.controller;

import com.concesionario.concesionariobackend.model.Marca;
import com.concesionario.concesionariobackend.model.Modelo;
import com.concesionario.concesionariobackend.service.MarcaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/concesionario/")
@CrossOrigin
public class MarcaController {

    @Autowired
    MarcaService marcaService;

    /**
     * Recupera la lista de todos las MARCAS almacenadas en la base de datos.
     *
     * @return una respuesta HTTP con la lista de MARCAS y el estado OK.
     */
    @GetMapping("/marca")
    public ResponseEntity<List<Marca>> list() {
        List<Marca> list = marcaService.list();
        return new ResponseEntity(list, HttpStatus.OK);
    }

    /**
     * Crea una nueva MARCA en la base de datos.
     *
     * @param marca la MARCA que se va a crear.
     * @return Una respuesta HTTP con la nueva MARCA creado y el estado CREATED.
     */
    @PostMapping("/anyadirMarca")
    public ResponseEntity<Modelo> crearModelo(@RequestBody Marca marca) {
        try {
            Marca nuevaMarca = marcaService.save(marca);
            return new ResponseEntity(nuevaMarca, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Edita una MARCA existente en la base de datos.
     *
     * @param id    el identificador de la MARCA a editar.
     * @param marca la MARCA con los nuevos datos.
     * @return una respuesta HTTP con el estado OK si la edición fue exitosa, o con el estado BAD_REQUEST si hubo un error.
     */
    @PutMapping("/editarMarca/{id}")
    public ResponseEntity<Modelo> editarMarca(@PathVariable("id") Long id, @RequestBody Marca marca) {
        try {
            Marca marcaEditar = marcaService.getOne(id).get();
            marcaEditar.setNombre_marca(marca.getNombre_marca());
            marcaService.save(marcaEditar);
            return new ResponseEntity(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Elimina una MARCA de la base de datos.
     *
     * @param id el identificador de la MARCA a eliminar.
     * @return una respuesta HTTP con el estado OK si la eliminación fue exitosa, o con el estado BAD_REQUEST si hubo un error.
     */
    @DeleteMapping("eliminarMarca/{id}")
    public ResponseEntity<Modelo> eliminarMarca(@PathVariable("id") Long id) {
        try {
            marcaService.delete(id);
            return new ResponseEntity(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

}
