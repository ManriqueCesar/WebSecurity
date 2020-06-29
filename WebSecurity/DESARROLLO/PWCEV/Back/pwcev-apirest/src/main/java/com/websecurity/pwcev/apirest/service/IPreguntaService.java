package com.websecurity.pwcev.apirest.service;

import java.util.Optional;

import com.websecurity.pwcev.apirest.model.Pregunta;

public interface IPreguntaService extends ICRUD<Pregunta> {
	
	Optional<Pregunta> findById(Integer id);


}
