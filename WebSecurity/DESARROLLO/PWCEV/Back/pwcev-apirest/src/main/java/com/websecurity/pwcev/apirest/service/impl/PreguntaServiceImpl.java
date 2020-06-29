package com.websecurity.pwcev.apirest.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.websecurity.pwcev.apirest.model.Pregunta;
import com.websecurity.pwcev.apirest.repository.IPreguntaRepo;
import com.websecurity.pwcev.apirest.service.IPreguntaService;

@Service
public class PreguntaServiceImpl implements IPreguntaService{

	
	@Autowired
	private IPreguntaRepo repo;
	
	@Override
	public Pregunta registrar(Pregunta t) {
		return repo.save(t);
	}

	@Override
	public Pregunta modificar(Pregunta t) {
		return repo.save(t);
	}

	@Override
	public List<Pregunta> listar() {
		return repo.findAll();
	}

	@Override
	public void eliminar(Integer id) {
		repo.deleteById(id);
	}

	@Override
	public Optional<Pregunta> findById(Integer id) {
		return repo.findById(id);
	}

}
