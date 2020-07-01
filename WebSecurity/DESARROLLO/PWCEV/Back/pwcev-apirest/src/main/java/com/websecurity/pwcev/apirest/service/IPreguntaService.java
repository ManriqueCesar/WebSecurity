package com.websecurity.pwcev.apirest.service;

import java.util.List;
import java.util.Optional;

import com.websecurity.pwcev.apirest.model.Pregunta;

public interface IPreguntaService{
	
	Optional<Pregunta> findById(Integer id);
	Pregunta registrar(Pregunta t);
	Pregunta modificar(Pregunta t);
	List<Pregunta> listar();
	void eliminar(Integer id);
	boolean existePregunta(Integer id);

}
