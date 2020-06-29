package com.websecurity.pwcev.apirest.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
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
	public Optional<Pregunta> listarPorId(@PathVariable("id") Integer idPregunta) {
		return service.findById(idPregunta);
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
