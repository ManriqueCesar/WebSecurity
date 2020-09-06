package com.websecurity.pwcev.apirest.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.websecurity.pwcev.apirest.model.Resultado;
import com.websecurity.pwcev.apirest.service.IExamenService;
import com.websecurity.pwcev.apirest.service.IResultadoService;

@Controller
@RequestMapping("/resultado")
public class ResultadoController {
	
	@Autowired
	private IResultadoService service;
	
	@Autowired
	private IExamenService exameneService;
	
	@GetMapping("/examen/{idexamen}")
	public ResponseEntity<?> listarResultadosPorExamen(@PathVariable("idexamen") Integer idExamen) {
		
		List<Resultado> resultados = null;
		Map<String, Object> response = new HashMap<>();
		
		try {
			resultados = service.ListarPorExamenes(idExamen);
		} catch (DataAccessException e) {
			response.put("mensaje", "Error al realizar la consulta en la base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		if (!exameneService.existeExamen(idExamen)) {
			response.put("mensaje", "No existe el examen");
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<List<Resultado>>(resultados,HttpStatus.OK);
				
	}
	@GetMapping("/examen/{idexamen}/curso/{idcurso}")
	public ResponseEntity<?> listarResultadosDeCursoPorExamen(@PathVariable("idexamen") Integer idExamen,@PathVariable("idcurso") Integer idCurso) {
		
		List<Resultado> resultados = null;
		Map<String, Object> response = new HashMap<>();
		
		try {
			resultados = service.ListarPorExamenes(idExamen, idCurso);
		} catch (DataAccessException e) {
			response.put("mensaje", "Error al realizar la consulta en la base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		if (!exameneService.existeExamen(idExamen)) {
			response.put("mensaje", "No existe el examen");
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<List<Resultado>>(resultados,HttpStatus.OK);
				
	}
	@PutMapping("/{idresultado}")
	public ResponseEntity<?> cambiodeEstado(@PathVariable("idresultado") Integer idresultado) {
		
		Resultado resultado = null;
		Map<String, Object> response = new HashMap<>();
		
		try {
			resultado=service.CambiarEstado(idresultado);
		} catch (DataAccessException e) {
			response.put("mensaje", "Error al realizar la consulta en la base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	
		return new ResponseEntity<Resultado>(resultado,HttpStatus.OK);
				
	}
	@GetMapping("/examen/{idexamen}/usuario/{idUsuario}")
	public ResponseEntity<?> notaAlumnoPorExamen(@PathVariable("idexamen") Integer idExamen,@PathVariable("idUsuario") Integer idUsuario) {
		
		Resultado resultados = new Resultado();
		Map<String, Object> response = new HashMap<>();
		
		try {
			resultados = service.ResultadoDeUsuario(idUsuario, idExamen);
		} catch (DataAccessException e) {
			response.put("mensaje", "Error al realizar la consulta en la base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		if (!exameneService.existeExamen(idExamen)) {
			response.put("mensaje", "No existe el examen");
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<Resultado>(resultados,HttpStatus.OK);
				
	}
}
