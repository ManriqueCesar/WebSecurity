package com.websecurity.pwcev.apirest.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.websecurity.pwcev.apirest.model.Examen;
import com.websecurity.pwcev.apirest.repository.IExamenRepo;
import com.websecurity.pwcev.apirest.service.IExamenService;

@Service
public class ExamenServiceImpl implements IExamenService{
	
	
	@Autowired
	private IExamenRepo repo;

	@Override
	public Examen registrar(Examen t) {
		return repo.save(t);
	}

	@Override
	public Examen modificar(Examen t) {
		return repo.save(t);
	}

	@Override
	public List<Examen> listar() {
		return repo.findAll();
	}

	@Override
	public void eliminar(Integer id) {
		repo.deleteById(id);
	}

	@Override
	public Optional<Examen> findById(Integer id) {
		return repo.findById(id);
	}
	


}
