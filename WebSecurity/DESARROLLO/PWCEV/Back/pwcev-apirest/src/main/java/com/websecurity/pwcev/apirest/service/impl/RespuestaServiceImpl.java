package com.websecurity.pwcev.apirest.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.websecurity.pwcev.apirest.model.Respuesta;
import com.websecurity.pwcev.apirest.repository.IRespuestaRepo;
import com.websecurity.pwcev.apirest.service.IRespuestaService;

@Service
public class RespuestaServiceImpl implements IRespuestaService{


	@Autowired
	private IRespuestaRepo repo;
	
	@Override
	public Respuesta registrar(Respuesta t) {
		return repo.save(t);
	}

	@Override
	public Respuesta modificar(Respuesta t) {
		return repo.save(t);
	}

	@Override
	public List<Respuesta> listar() {
		return repo.findAll();
	}

	@Override
	public void eliminar(Integer id) {
		repo.deleteById(id);
	}

	@Override
	public Optional<Respuesta> findById(Integer id) {
		return repo.findById(id);
	}

}
