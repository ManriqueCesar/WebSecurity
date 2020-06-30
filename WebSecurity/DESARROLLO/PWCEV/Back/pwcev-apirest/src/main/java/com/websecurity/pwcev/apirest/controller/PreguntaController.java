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


import com.websecurity.pwcev.apirest.model.Pregunta;
import com.websecurity.pwcev.apirest.service.IPreguntaService;

@RestController
@RequestMapping("/preguntas")
public class PreguntaController {

	@Autowired
	private IPreguntaService service;
	
	@GetMapping
	public List<Pregunta> listar() {
		return service.listar();
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<?> listarPorId(@PathVariable("id") Integer idPregunta) {
		
		Optional<Pregunta> pregunta = null;
		Map<String, Object> response = new HashMap<>();
		
		try {
			pregunta = service.findById(idPregunta);
		} catch (DataAccessException e) {
			response.put("mensaje", "Error al realizar la consulta en la base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}
		
		if (pregunta.isEmpty()) {
			response.put("mensaje", "La pregunta con ID: ".concat(idPregunta.toString().concat(" no existe en la base de datos!")));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<Optional<Pregunta>>(pregunta,HttpStatus.OK);
	}
	
	@PostMapping
	public Pregunta registrar(@RequestBody Pregunta pre) {
		return service.registrar(pre);
	}
	
	@PutMapping
	public Pregunta modificar(@RequestBody Pregunta pre) {
		return service.modificar(pre);
	}
	
	@DeleteMapping("/{id}")
	public void eliminar(@PathVariable("id") Integer idPregunta) {
		service.eliminar(idPregunta);
	}
}
