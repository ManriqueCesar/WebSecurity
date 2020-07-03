package com.websecurity.pwcev.apirest.service;

import java.util.List;
import java.util.Optional;

import com.websecurity.pwcev.apirest.model.Curso;

public interface ICursoService {
	
	Optional<Curso> findById(Integer id);
	Curso registrar(Curso t);
	Curso modificar(Curso t);
	List<Curso> listar();
	void eliminar(Integer id);
	boolean existeCurso(Integer id);
}
