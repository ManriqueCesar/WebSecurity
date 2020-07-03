package com.websecurity.pwcev.apirest.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.websecurity.pwcev.apirest.model.DetalleCurso;
import com.websecurity.pwcev.apirest.repository.IDetalleCursoRepo;
import com.websecurity.pwcev.apirest.service.IDetalleCursoService;

public class DetalleCursoServiceImpl  implements IDetalleCursoService{

	@Autowired
	private IDetalleCursoRepo repo;
	
	@Override
	public DetalleCurso registrar(DetalleCurso t) {
		return repo.save(t);
	}

	@Override
	public DetalleCurso modificar(DetalleCurso t) {
		return repo.save(t);
	}

	@Override
	public List<DetalleCurso> listar() {
		return repo.findAll();
	}

	@Override
	public void eliminar(Integer id) {
		repo.deleteById(id);
	}

}
