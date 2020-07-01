package com.websecurity.pwcev.apirest.service;

import java.util.List;
import java.util.Optional;

import com.websecurity.pwcev.apirest.model.Examen;

public interface IExamenService{
	
	Optional<Examen> findById(Integer id);
	Examen registrar(Examen t);
	Examen modificar(Examen t);
	List<Examen> listar();
	void eliminar(Integer id);
	boolean existeExamen(Integer id);
}
