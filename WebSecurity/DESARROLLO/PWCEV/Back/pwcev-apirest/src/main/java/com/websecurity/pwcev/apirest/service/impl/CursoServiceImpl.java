package com.websecurity.pwcev.apirest.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.websecurity.pwcev.apirest.model.Curso;
import com.websecurity.pwcev.apirest.repository.ICursoRepo;
import com.websecurity.pwcev.apirest.service.ICursoService;

@Service
public class CursoServiceImpl implements ICursoService{
	
	@Autowired
	private ICursoRepo repo;

	@Override
	public Optional<Curso> findById(Integer id) {
		return repo.findById(id);
	}

	@Override
	public Curso registrar(Curso t) {
		return repo.save(t);
	}

	@Override
	public Curso modificar(Curso t) {
		return repo.save(t);
	}

	@Override
	public List<Curso> listar() {
		return repo.findAll();
	}

	@Override
	public void eliminar(Integer id) {
		repo.deleteById(id);
	}

	@Override
	public boolean existeCurso(Integer id) {
		return repo.existsById(id);
	}

}
