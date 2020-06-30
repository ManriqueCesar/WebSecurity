package com.websecurity.pwcev.apirest.service;

import java.util.List;
import java.util.Optional;

import com.websecurity.pwcev.apirest.model.Respuesta;

public interface IRespuestaService {
	
	Optional<Respuesta> findById(Integer id);
	Respuesta registrar(Respuesta t);
	Respuesta modificar(Respuesta t);
	List<Respuesta> listar();
	void eliminar(Integer id);


}
