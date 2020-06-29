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

import com.websecurity.pwcev.apirest.model.Respuesta;
import com.websecurity.pwcev.apirest.service.IRespuestaService;

@RestController
@RequestMapping("/respuestas")
public class RespuestaController {
	
	@Autowired
	private IRespuestaService service;
	
	@GetMapping
	public List<Respuesta> listar() {
		return service.listar();
	}
	
	@GetMapping("/{id}")
	public Optional<Respuesta> listarPorId(@PathVariable("id") Integer idRespuesta) {
		return service.findById(idRespuesta);
	}
	
	@PostMapping
	public Respuesta registrar(@RequestBody Respuesta res) {
		return service.registrar(res);
	}
	
	@PutMapping
	public Respuesta modificar(@RequestBody Respuesta res) {
		return service.modificar(res);
	}
	
	@DeleteMapping("/{id}")
	public void eliminar(@PathVariable("id") Integer idRespuesta) {
		service.eliminar(idRespuesta);
	}

}
