package com.websecurity.pwcev.apirest.service;

import java.util.Optional;

import com.websecurity.pwcev.apirest.model.Examen;

public interface IExamenService extends ICRUD<Examen>{
	
	Optional<Examen> findById(Integer id);

}
