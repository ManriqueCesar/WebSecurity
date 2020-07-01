package com.websecurity.pwcev.apirest.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.websecurity.pwcev.apirest.model.Examen;
import com.websecurity.pwcev.apirest.service.IExamenService;


@RestController
@RequestMapping("/examenes")
public class ExamenController {
	
	@Autowired
	private IExamenService service;
	
	@GetMapping
	public List<Examen> listar() {
		return service.listar();
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<?> listarPorId(@PathVariable("id") Integer idExamen) {
		
		Optional<Examen> examen = null;
		Map<String, Object> response = new HashMap<>();
		
		try {
			examen = service.findById(idExamen);
		} catch (DataAccessException e) {
			response.put("mensaje", "Error al realizar la consulta en la base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		if (!service.existeExamen(idExamen)) {
			response.put("mensaje", "El examen ID: ".concat(idExamen.toString().concat(" no existe en la base de datos!")));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<Optional<Examen>>(examen,HttpStatus.OK);
	}
	
	@PostMapping
	public ResponseEntity<?> registrar(@RequestBody Examen ex) {
		Examen examen = null;
		Map<String, Object> response = new HashMap<>();
		
		try {
			examen = service.registrar(ex);
		} catch (DataAccessException e) {
			response.put("mensaje", "Error al realizar el insert en la base de datos.");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		response.put("mensaje", "El examen ha sido creado con éxito!");
		response.put("examen",examen);
		return new ResponseEntity<Map<String,Object>>(response, HttpStatus.CREATED);
	}
	
	@PutMapping
	public ResponseEntity<?> modificar(@RequestBody Examen ex) {
		
		Examen examen = null;
		Map<String, Object> response = new HashMap<>();
		
		try {
			examen = service.modificar(ex);
		} catch (DataAccessException e) {
			response.put("mensaje", "Error al realizar el update en la base de datos.");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		response.put("mensaje", "El examen ha sido actualizado con éxito!");
		response.put("examen",examen);
		return new ResponseEntity<Map<String,Object>>(response, HttpStatus.CREATED);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> eliminar(@PathVariable("id") Integer idExamen) {
		
		Map<String, Object> response = new HashMap<>();
		
		try {
			service.eliminar(idExamen);
		} catch (DataAccessException e) {
			response.put("mensaje", "Error al realizar el delete en la base de datos.");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		response.put("mensaje", "El examen ha sido eliminado con éxito!");
		return new ResponseEntity<Map<String,Object>>(response, HttpStatus.OK);
	}

}
