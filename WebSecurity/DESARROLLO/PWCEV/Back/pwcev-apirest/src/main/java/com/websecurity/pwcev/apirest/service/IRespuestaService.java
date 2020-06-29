package com.websecurity.pwcev.apirest.service;

import java.util.Optional;

import com.websecurity.pwcev.apirest.model.Respuesta;

public interface IRespuestaService extends ICRUD<Respuesta>{
	
	Optional<Respuesta> findById(Integer id);


}
