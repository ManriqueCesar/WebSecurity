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
	public Optional<Examen> listarPorId(@PathVariable("id") Integer idExamen) {
		return service.findById(idExamen);
	}
	
	@PostMapping
	public Examen registrar(@RequestBody Examen ex) {
		return service.registrar(ex);
	}
	
	@PutMapping
	public Examen modificar(@RequestBody Examen ex) {
		return service.modificar(ex);
	}
	
	@DeleteMapping("/{id}")
	public void eliminar(@PathVariable("id") Integer idExamen) {
		service.eliminar(idExamen);
	}

}
