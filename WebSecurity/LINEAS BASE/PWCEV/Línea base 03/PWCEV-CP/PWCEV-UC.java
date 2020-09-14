package com.websecurity.pwcev.apirest.controller;


import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.websecurity.pwcev.apirest.model.Respuesta;
import com.websecurity.pwcev.apirest.model.Usuario;
import com.websecurity.pwcev.apirest.service.IUsuarioService;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {
	
	
	@Autowired
	private IUsuarioService service;
	
	

	@GetMapping
	public List<Usuario> getUsuarios(){
			
			return service.listar();
	}
	
	/*@GetMapping("/{username}/{password}")
	public ResponseEntity<?> buscarPorUserAndPass(@PathVariable("username") String username,@PathVariable("password") String password) {
		
		Optional<Usuario> us = null;
		Map<String, Object> response = new HashMap<>();
		
		try {
			us = service.buscarPorUsurnamePassword(username, password);
		} catch (DataAccessException e) {
			response.put("mensaje", "Error al realizar la consulta en la base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		if (!service.existeUsuarioByUserPass(username, password)) {
			response.put("mensaje", "El usuario no existe con esas credenciales");
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<Optional<Usuario>>(us,HttpStatus.OK);
				
	}*/
	
	@GetMapping("/{id}")
	public Optional<Usuario> usuarioId(@PathVariable("id") int id) {
		return service.buscarPorId(id);
	}
	
	@GetMapping("/email/{email}")
	public ResponseEntity<?> bucarUsuarioPorEmail(@PathVariable("email") String email) {
		
		Usuario us = null;
		Map<String, Object> response = new HashMap<>();
		
		try {
			us = service.findByEmail(email);
		} catch (DataAccessException e) {
			response.put("mensaje", "Error al realizar la consulta en la base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		if (!service.existeUsuarioByEmail(email)) {
			response.put("mensaje", "El usuario no existe con esas credenciales");
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<Usuario>(us,HttpStatus.OK);
				
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> bucarUsuarioPorEmailandPassword(@RequestBody Usuario usuario) {
		
		Usuario us = null;
		Map<String, Object> response = new HashMap<>();
		
		try {
			us = service.findByEmailAndPassword(usuario.getEmail(), usuario.getPassword());
		} catch (DataAccessException e) {
			response.put("mensaje", "Error al realizar la consulta en la base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		if (!service.existeUsuarioByEmail(usuario.getEmail())) {
			response.put("mensaje", "El usuario no existe con esas credenciales");
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<Usuario>(us,HttpStatus.OK);
				
	}

}
