package com.websecurity.pwcev.apirest.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.websecurity.pwcev.apirest.model.Curso;
import com.websecurity.pwcev.apirest.model.Examen;
import com.websecurity.pwcev.apirest.repository.ICursoRepo;
import com.websecurity.pwcev.apirest.repository.IDetalleCursoRepo;
import com.websecurity.pwcev.apirest.repository.IExamenRepo;
import com.websecurity.pwcev.apirest.service.ICursoService;

@Service
@Transactional
public class CursoServiceImpl implements ICursoService{
	
	@Autowired
	private ICursoRepo repo;
	
	@Autowired
	private IExamenRepo repoEx;
	
	@Autowired
	private ExamenServiceImpl servExa;
	
	@Autowired
	private IDetalleCursoRepo repoDC;

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
		
		List<Examen> examenes =  new ArrayList<Examen>();
		
		examenes = repoEx.findByCursoIdCurso(id);
		
		if (examenes.size() > 0) {
			for (Examen examen : examenes) {
				servExa.eliminar(examen.getIdExamen());
			}
		}
		
		repoDC.deleteByCursoIdCurso(id);
		
		repo.deleteById(id);
	}

	@Override
	public boolean existeCurso(Integer id) {
		return repo.existsById(id);
	}

}
