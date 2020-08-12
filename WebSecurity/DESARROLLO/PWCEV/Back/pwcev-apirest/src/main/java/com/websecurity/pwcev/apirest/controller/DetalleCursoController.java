package com.websecurity.pwcev.apirest.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

import com.websecurity.pwcev.apirest.entidadModelo.DetalleCursoModelo;
import com.websecurity.pwcev.apirest.model.Curso;
import com.websecurity.pwcev.apirest.model.DetalleCurso;
import com.websecurity.pwcev.apirest.service.IDetalleCursoService;
import com.websecurity.pwcev.apirest.service.IUsuarioService;

@RestController
@RequestMapping("/detallecurso")
public class DetalleCursoController {
	
	@Autowired
	private IDetalleCursoService service;
	@Autowired
	private IUsuarioService usuarioService;
	
	@GetMapping("/usuario/{idusuario}")
	public ResponseEntity<?> listarPorUserAndPass(@PathVariable("idusuario") Integer idUsuario) {
		
		List<Curso> cursos = null;
		Map<String, Object> response = new HashMap<>();
		
		try {
			cursos = service.listarCursosPorIdUsuario(idUsuario);
		} catch (DataAccessException e) {
			response.put("mensaje", "Error al realizar la consulta en la base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		if (!usuarioService.existeUsuarioById(idUsuario)) {
			response.put("mensaje", "El usuario no existe con esas credenciales");
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<List<Curso>>(cursos,HttpStatus.OK);
				
	}
	
	@PostMapping
	public ResponseEntity<?> registrar(@RequestBody DetalleCursoModelo cursoUsuarios) {
		DetalleCurso detalleCursos = null;
		Map<String, Object> response = new HashMap<>();

		try {
			detalleCursos = service.registrar(cursoUsuarios);
		} catch (DataAccessException e) {

			response.put("mensaje", "No se pudo asignar un profesor.");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);

		}
		// Validar si existe el usuario
		if (!usuarioService.existeUsuarioById(cursoUsuarios.getIdUsuario())) {
			response.put("mensaje", "No se pudo asignar un profesor, el usuario no existe");
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		} else {
			// Rol de profesor es 2
			if (!usuarioService.validarRol(cursoUsuarios.getIdUsuario(), 2)) {
				response.put("mensaje", "No se pudo asignar un profesor, el usuario no cuenta con el rol de profesor");
				return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
			}else {
				response.put("mensaje", "Se asigno el profesor al curso con exito !");
			}

		}

		response.put("curso", detalleCursos);
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
	}

	
}
